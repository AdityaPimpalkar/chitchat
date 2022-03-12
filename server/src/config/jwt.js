import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jwt from "jsonwebtoken";
import config from "../../config.js";

// const dirname = path.dirname(fileURLToPath(import.meta.url));
// const privateKey = fs.readFileSync(dirname + "/../../jwtRS256.key");

const privateKey = config.jwtPrivateKey;

export function createToken(obj) {
  // const token = jwt.sign(obj, privateKey, { algorithm: "RS256" });
  const token = jwt.sign(obj, privateKey);
  return token;
}

export function decodeToken(token) {
  try {
    // const jwtDecoded = jwt.verify(token, privateKey, {
    //   algorithms: ["RS256"],
    // });
    const jwtDecoded = jwt.verify(token, privateKey);
    return jwtDecoded;
  } catch (error) {
    return null;
  }
}
