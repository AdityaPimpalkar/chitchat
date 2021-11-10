import Redis from "ioredis";
import { v4 as uuidv4 } from "uuid";
import jwt_decode from "jwt-decode";
import { RedisSessionStorage } from "../src/services/session.js";

const redisClient = new Redis();
const sessionStorage = new RedisSessionStorage(redisClient);

export async function auth(socket, next) {
  const token = socket.handshake.auth.token;
  if (token) {
    const jwtToken = jwt_decode(token);
    const session = await sessionStorage.findSession(jwtToken.sub);
    if (session) {
      socket.sessionId = session.sessionId;
      socket.userId = session.userId;
      socket.username = session.username;
      return next();
    } else {
      return next(new Error("Invalid session"));
    }
  }

  const user = socket.handshake.auth.user;
  if (!user) {
    return next(new Error("Invalid user"));
  }
  const tokenId = socket.handshake.auth.tokenId;

  socket.user = user;
  socket.username = user.name;
  socket.userId = user.googleId;
  socket.sessionId = uuidv4();
  socket.token = tokenId;

  next();
}
