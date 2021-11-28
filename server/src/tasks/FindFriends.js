import { RedisFriendStorage } from "../services/Friends.js";
const FindFriends = new RedisFriendStorage();

export async function searchFriend(socket, email) {
  const friend = await FindFriends.searchFriend(email);
  socket.emit("searchedFriend", friend);
}
