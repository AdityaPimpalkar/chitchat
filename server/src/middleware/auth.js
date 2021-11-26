import Redis from "ioredis";
import { v4 as uuidv4 } from "uuid";
import { createToken, decodeToken } from "../config/jwt.js";
import { RedisSessionStorage } from "../services/session.js";

const redisClient = new Redis();
const sessionStorage = new RedisSessionStorage(redisClient);

export async function auth(socket, next) {
  const token = socket.handshake.auth.token;
  if (token) {
    const jwtToken = decodeToken(token);
    const session = await sessionStorage.findSession(jwtToken.userId);
    if (session) {
      socket.user = {
        username: jwtToken.username,
        userId: jwtToken.userId,
        sessionId: session.sessionId,
        email: jwtToken.email,
        image: jwtToken.image,
      };
      socket.sessionId = session.sessionId;
      socket.userId = jwtToken.userId;
      socket.username = jwtToken.username;
      socket.token = token;
      return next();
    } else {
      return next(new Error("Invalid session"));
    }
  }

  const user = socket.handshake.auth.user;
  if (!user) {
    return next(new Error("Invalid user"));
  }

  const session = await sessionStorage.findSession(user.googleId);
  let sessionId;
  if (session) {
    sessionId = session.sessionId;
  } else {
    sessionId = uuidv4();
  }

  const userObj = {
    username: user.name,
    userId: user.googleId,
    email: user.email,
    sessionId,
    image: user.imageUrl,
  };

  socket.user = userObj;
  socket.username = user.name;
  socket.userId = user.googleId;
  socket.sessionId = sessionId;
  socket.token = createToken(userObj);
  next();
}
