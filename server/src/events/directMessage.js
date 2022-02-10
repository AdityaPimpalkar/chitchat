import { socket } from "../../socket.js";
import socketEvents from "../config/socketEvents.js";
import { privateMessages, userMessages } from "../tasks/directMessage.js";

export default function directMessageEvents() {
  socket.on(socketEvents.PRIVATE_MESSAGE, (message) =>
    privateMessages(message)
  );

  socket.on(socketEvents.USER_MESSAGES, (user) => userMessages(user));
}
