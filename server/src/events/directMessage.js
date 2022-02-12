import { socket } from "../../socket.js";
import socketEvents from "../config/socketEvents.js";
import { privateMessages, userMessages } from "../tasks/directMessage.js";

export default function directMessageEvents() {
  try {
    socket.on(socketEvents.USER_MESSAGES, (user) => userMessages(user));

    socket.on(socketEvents.PRIVATE_MESSAGE, (message) =>
      privateMessages(message)
    );
  } catch (error) {
    socket.emit(socketEvents.SERVER_ERROR, error.message);
  }
}
