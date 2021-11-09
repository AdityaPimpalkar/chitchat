import Redis from "ioredis";
import { v4 as uuidv4 } from "uuid";
import { RedisSessionStorage } from "../src/services/session.js";

const redisClient = new Redis();
const sessionStorage = new RedisSessionStorage(redisClient);

export async function auth(socket, next) {
  const sessionId = socket.handshake.auth.sessionId;
  if (sessionId) {
    const session = await sessionStorage.findSession(sessionId);
    if (session) {
      socket.sessionId = sessionId;
      socket.userId = session.userId;
      socket.username = session.username;
      return next();
    } else {
      return next(new Error("Invalid session"));
    }
  }

  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("Invalid username"));
  }

  socket.username = username;
  socket.userId = uuidv4();
  socket.sessionId = uuidv4();
  next();
}
