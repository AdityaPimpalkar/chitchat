import { socket } from "../../socket.js";
import socketEvents from "../config/socketEvents.js";
import { disconnect } from "../tasks/connection.js";

export default function onDisconnectEvents() {
  socket.on(socketEvents.DISCONNECT, async () => await disconnect());
}
