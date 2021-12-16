import { socket } from "../../socket.js";
import { disconnect } from "../tasks/connection.js";

export default function onDisconnectEvents() {
  socket.on("disconnect", () => disconnect());
}
