import { socket } from "../../socket.js";
import socketEvents from "../config/socketEvents.js";
import { disconnect } from "../tasks/connection.js";

export default function onDisconnect() {
  try {
    socket.on(socketEvents.DISCONNECT, async () => await disconnect());
  } catch (error) {
    socket.emit(socketEvents.SERVER_ERROR, error.message);
  }
}
