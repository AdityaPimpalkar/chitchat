import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const privateKey = fs.readFileSync(dirname + "/../../jwtRS256.key");

export function createToken(obj) {
  const token = jwt.sign(obj, privateKey, { algorithm: "RS256" });
  return token;
}

export function decodeToken(token) {
  try {
    const jwtDecoded = jwt.verify(token, privateKey, {
      algorithms: ["RS256"],
    });
    return jwtDecoded;
  } catch (error) {
    return null;
  }
}
