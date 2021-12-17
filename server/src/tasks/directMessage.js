import { RedisMessageStorage } from "../services/message.js";
import { io, socket } from "../../socket.js";
const messageStorage = new RedisMessageStorage();

export async function userMessages({ userId, username }) {
  const [userMessages, connectionSocket] = await Promise.all([
    getMessagesForUser(socket.userId),
    io.in(userId).allSockets(),
  ]);
  socket.emit("user messages", {
    userId,
    username,
    messages: userMessages.get(userId) || [],
    connected: connectionSocket.size === 0 ? false : true,
  });
}

export async function privateMessages({ content, to }) {
  const message = {
    from: socket.userId,
    to,
    content,
  };
  socket.to(to).emit("private message", message);
  await messageStorage.saveMessage(message);
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
