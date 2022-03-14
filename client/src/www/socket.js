import { io } from "socket.io-client";
import config from "../config";

const socket = io(config.serverUrl, {
  transports: ["websocket"],
});
export default socket;
