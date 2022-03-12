import redis from "../config/redis.js";
import { RedisSessionStorage } from "../services/session.js";

const sessionStorage = new RedisSessionStorage(redis);

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
