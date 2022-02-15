import { socket } from "../../socket.js";
import socketEvents from "../config/socketEvents.js";
import { searchFriend, addFriend, acceptRequest } from "../tasks/friends.js";

export default function friendsEvents() {
  try {
    socket.on(
      socketEvents.SEARCH_FRIEND,
      async (email) => await searchFriend(email)
    );

    socket.on(
      socketEvents.ADD_FRIEND,
      async (friend) => await addFriend(friend)
    );

    socket.on("acceptRequest", async (friend) => await acceptRequest(friend));
  } catch (error) {
    socket.on(socketEvents.SERVER_ERROR, error.message);
  }
}
