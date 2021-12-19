import { io } from "socket.io-client";
const serverUrl = process.env.serverUrl || "http://localhost:4000";
const socket = io(serverUrl);
export default socket;
