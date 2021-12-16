import { socket } from "../../socket.js";
import { privateMessages, userMessages } from "../tasks/directMessage.js";

export default function directMessageEvents() {
  socket.on("private message", (message) => privateMessages(message));

  socket.on("user messages", (user) => userMessages(user));
}
