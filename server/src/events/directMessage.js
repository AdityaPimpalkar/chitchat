import { socket } from "../../socket.js";
import socketEvents from "../config/socketEvents.js";
import { privateMessages, userMessages } from "../tasks/directMessage.js";

export default function directMessage() {
  try {
    socket.on(
      socketEvents.USER_MESSAGES,
      async (user) => await userMessages(user)
    );

    socket.on(
      socketEvents.PRIVATE_MESSAGE,
      async (message, callback) => await privateMessages(message, callback)
    );
  } catch (error) {
    socket.emit(socketEvents.SERVER_ERROR, error.message);
  }
}
