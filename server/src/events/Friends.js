import { socket } from "../../socket.js";
import { searchFriend, addFriend, acceptRequest } from "../tasks/Friends.js";

export default function FriendsEvents() {
  socket.on("searchFriend", (email) => searchFriend(email));

  socket.on("addFriend", (friend) => addFriend(friend));

  socket.on("acceptRequest", (friend) => acceptRequest(friend));
}
