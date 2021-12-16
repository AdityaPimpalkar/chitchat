import { io, socket } from "../../socket.js";
import { RedisSessionStorage } from "../services/session.js";
import { RedisMessageStorage } from "../services/message.js";
import { RedisGroupStorage } from "../services/group.js";
import { RedisFriendStorage } from "../services/Friends.js";

const sessionStorage = new RedisSessionStorage();
const messageStorage = new RedisMessageStorage();
const groupStorage = new RedisGroupStorage();
const FindFriends = new RedisFriendStorage();

export async function connect() {
  const { user, sessionId, userId } = socket;
  await sessionStorage.saveSession(sessionId, {
    ...user,
    connected: true,
  });
  socket.join(userId);
}

export async function disconnect() {
  const matchingSockets = await io.in(socket.userId).allSockets();
  const isDisconnected = matchingSockets.size === 0;
  if (isDisconnected) {
    //notify other users
    socket.broadcast.emit("user disconnected", socket.user);
    const user = {
      ...socket.user,
      connected: socket.connected,
    };
    //update the connection status of the session
    await sessionStorage.saveSession(socket.sessionId, user);
  }
}

export async function getUsers(userId) {
  const users = [];
  const [sessions, userMessages] = await Promise.all([
    sessionStorage.getConversations(userId),
    getMessagesForUser(userId),
  ]);
  sessions.forEach((session) => {
    if (session.userId !== userId) {
      users.push({
        userId: session.userId,
        username: session.username,
        image: session.image,
        connected: session.connected,
        messages: userMessages.get(userId) || [],
      });
    }
  });
  return users;
}

export async function getGroups(sessionId) {
  const groups = await groupStorage.getGroups(sessionId);
  return groups;
}

export async function getFriendRequests(userId) {
  const friends = await FindFriends.getFriendRequests(userId);
  return friends;
}

async function getMessagesForUser(userId) {
  const messagesPerUser = new Map();
  const messages = await messageStorage.findMessagesForUser(userId);
  messages.forEach((message) => {
    const { from, to } = message;
    const otherUser = userId === from ? to : from;
    if (messagesPerUser.has(otherUser)) {
      messagesPerUser.get(otherUser).push(message);
    } else {
      messagesPerUser.set(otherUser, [message]);
    }
  });
  return messagesPerUser;
}
