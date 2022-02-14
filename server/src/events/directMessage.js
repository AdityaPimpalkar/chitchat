import { socket } from "../../socket.js";
import socketEvents from "../config/socketEvents.js";
import { privateMessages, userMessages } from "../tasks/directMessage.js";

export default function directMessageEvents() {
  try {
    socket.on(
      socketEvents.USER_MESSAGES,
      async (user) => await userMessages(user)
    );

    socket.on(
      socketEvents.PRIVATE_MESSAGE,
      async (message) => await privateMessages(message)
    );
  } catch (error) {
    socket.emit(socketEvents.SERVER_ERROR, error.message);
  }
}
