import jwt from "jsonwebtoken";
import config from "../../config.js";

const privateKey = config.jwtPrivateKey;

export function createToken(obj) {
  const token = jwt.sign(obj, privateKey);
  return token;
}

export function decodeToken(token) {
  try {
    const jwtDecoded = jwt.verify(token, privateKey);
    return jwtDecoded;
  } catch (error) {
    return null;
  }
}
