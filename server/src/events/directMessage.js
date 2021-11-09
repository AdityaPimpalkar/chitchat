import { privateMessages, userMessages } from "../tasks/directMessage.js";

export default function directMessageEvents(socket) {
  socket.on("private message", (message) => privateMessages(socket, message));

  socket.on("user messages", (user) => userMessages(socket, user));
}
