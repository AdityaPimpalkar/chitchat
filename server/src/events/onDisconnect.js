import { disconnect } from "../tasks/connection.js";

export default function onDisconnectEvents(io, socket) {
  socket.on("disconnect", () => disconnect(io, socket));
}
