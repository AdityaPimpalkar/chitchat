import { searchFriend, addFriend } from "../tasks/FindFriends.js";
//import socket from "../config/ioredis.js";

export default function FindFriendsEvents(socket) {
  socket.on("searchFriend", (email) => searchFriend(socket, email));

  socket.on("addFriend", (friend) => addFriend(socket, friend));
}
