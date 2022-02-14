import { socket } from "../../socket.js";
import { searchFriend, addFriend, acceptRequest } from "../tasks/friends.js";

export default function friendsEvents() {
  socket.on("searchFriend", async (email) => await searchFriend(email));

  socket.on("addFriend", async (friend) => await addFriend(friend));

  socket.on("acceptRequest", async (friend) => await acceptRequest(friend));
}
