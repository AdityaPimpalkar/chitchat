import { RedisMessageStorage } from "../services/message.js";
import { RedisSessionStorage } from "../services/session.js";
import { io, socket } from "../../socket.js";
import { decodeToken } from "../config/jwt.js";
import socketEvents from "../config/socketEvents.js";

const messageStorage = new RedisMessageStorage();
const sessionStorage = new RedisSessionStorage();

export async function userMessages({ userId, username }) {
  try {
    const isValid = decodeToken(socket.token);
    if (isValid) {
      const [session, userMessages, connectionSocket] = await Promise.all([
        getLastSeen(userId),
        getMessagesForUser(socket.userId),
        io.in(userId).allSockets(),
      ]);
      socket.emit(socketEvents.USER_MESSAGES, {
        userId,
        username,
        messages: userMessages.get(userId) || [],
        connected: connectionSocket.size === 0 ? false : true,
        lastSeen: session?.lastSeen != null ? new Date(session.lastSeen) : null,
      });
    }
  } catch (error) {
    throw error;
  }
}

export async function privateMessages({ content, to }) {
  const message = {
    from: socket.userId,
    to,
    content,
    sentOn: new Date(),
  };
  socket.to(to).emit(socketEvents.PRIVATE_MESSAGE, message);
  await messageStorage.saveMessage(message);
}

export async function getLastSeen(userId) {
  try {
    const lastSeen = await sessionStorage.getLastSeen(userId);
    if (lastSeen.result) return lastSeen.data;
    else throw lastSeen.error;
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
