import { searchFriend } from "../tasks/FindFriends.js";
//import socket from "../config/ioredis.js";

export default function FindFriendsEvents(socket) {
  socket.on("searchFriend", (email) => searchFriend(socket, email));
}
