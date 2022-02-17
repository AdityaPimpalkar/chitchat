import { io, socket } from "../../socket.js";
import socketEvents from "../config/socketEvents.js";
import { decodeToken } from "../config/jwt.js";
import { RedisSessionStorage } from "../services/session.js";
import { RedisMessageStorage } from "../services/message.js";
import { RedisGroupStorage } from "../services/group.js";
import { RedisFriendStorage } from "../services/friends.js";

const sessionStorage = new RedisSessionStorage();
const messageStorage = new RedisMessageStorage();
const groupStorage = new RedisGroupStorage();
const FindFriends = new RedisFriendStorage();

export async function disconnect() {
  const isValid = decodeToken(socket.token);
  if (isValid) {
    try {
      const matchingSockets = await io.in(socket.userId).allSockets();
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected) {
        const user = {
          ...socket.user,
          connected: false,
          lastSeen: new Date(),
        };
        //notify other users
        socket.broadcast.emit(socketEvents.USER_DISCONNECTED, user);
        //update the connection status of the session
        await sessionStorage.saveSession(socket.sessionId, user);
      }
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("Invalid token.");
  }
}

export async function getUsers(userId) {
  try {
    const [conversations, userMessages] = await Promise.all([
      getConversations(userId),
      getMessagesForUser(userId),
    ]);
    const users = [];
    conversations.forEach((session) => {
      if (session.userId !== userId) {
        const messages = userMessages.get(session.userId) || [];
        const lastMessage = messages[messages.length - 1] || {};
        users.push({
          userId: session.userId,
          username: session.username,
          image: session.image,
          connected: session.connected,
          lastSeen: session.lastSeen,
          lastMessage,
        });
      }
    });
    return users;
  } catch (error) {
    throw error;
  }
}

async function getConversations(userId) {
  try {
    const conversations = await sessionStorage.getConversations(userId);
    if (conversations.result) return conversations.data;
    else throw conversations.error;
  } catch (error) {
    throw error;
  }
}

export async function getGroups(sessionId) {
  try {
    const groups = await groupStorage.getGroups(sessionId);
    if (groups.result) return groups.data;
    else throw groups.error;
  } catch (error) {
    throw error;
  }
}

export async function getFriendRequests(userId) {
  try {
    const friends = await FindFriends.getFriendRequests(userId);
    if (friends.result) return friends.data;
    else throw friends.error;
  } catch (error) {
    throw error;
  }
}

async function getMessagesForUser(userId) {
  try {
    const messages = await messageStorage.findMessagesForUser(userId);
    if (messages.result) {
      const messagesPerUser = new Map();
      messages.data.forEach((message) => {
        const { from, to } = message;
        const otherUser = userId === from ? to : from;
        if (messagesPerUser.has(otherUser)) {
          messagesPerUser.get(otherUser).push(message);
        } else {
          messagesPerUser.set(otherUser, [message]);
        }
      });
      return messagesPerUser;
    } else {
      throw messages.error;
    }
  } catch (error) {
    throw error;
  }
}
