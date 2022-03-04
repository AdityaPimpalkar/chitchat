import { socket } from "../../socket.js";
import socketEvents from "../config/socketEvents.js";
import { searchFriend, addFriend, acceptRequest } from "../tasks/friends.js";

export default function friends() {
  try {
    socket.on(
      socketEvents.SEARCH_FRIEND,
      async (email, callback) => await searchFriend(email, callback)
    );

    socket.on(
      socketEvents.ADD_FRIEND,
      async (friend, callback) => await addFriend(friend, callback)
    );

    socket.on(
      socketEvents.ACCEPT_REQUEST,
      async (friend, callback) => await acceptRequest(friend, callback)
    );
  } catch (error) {
    socket.on(socketEvents.SERVER_ERROR, error.message);
  }
}
