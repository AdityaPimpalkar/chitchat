import { searchFriend, addFriend, acceptRequest } from "../tasks/Friends.js";
//import socket from "../config/ioredis.js";

export default function FriendsEvents(socket) {
  socket.on("searchFriend", (email) => searchFriend(socket, email));

  socket.on("addFriend", (friend) => addFriend(socket, friend));

  socket.on("acceptRequest", (friend) => acceptRequest(socket, friend));
}
