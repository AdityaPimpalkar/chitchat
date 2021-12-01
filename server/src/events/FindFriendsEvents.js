import {
  searchFriend,
  addFriend,
  acceptRequest,
} from "../tasks/FindFriends.js";
//import socket from "../config/ioredis.js";

export default function FindFriendsEvents(socket) {
  socket.on("searchFriend", (email) => searchFriend(socket, email));

  socket.on("addFriend", (friend) => addFriend(socket, friend));

  socket.on("acceptRequest", (friend) => acceptRequest(socket, friend));
}
