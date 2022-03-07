import Redis from "ioredis";
import { RedisSessionStorage } from "../services/session.js";

const redisClient = new Redis();
const sessionStorage = new RedisSessionStorage(redisClient);

export default async function initConnect(socket, next) {
  try {
    const { user, sessionId, userId } = socket;
    await sessionStorage.saveSession(sessionId, {
      ...user,
      connected: true,
      lastSeen: null,
    });
    socket.join(userId);
    next();
  } catch (error) {
    next(new Error("Error connecting to server - " + error.message));
  }
}
