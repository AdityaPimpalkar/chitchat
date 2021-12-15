import { RedisFriendStorage } from "../services/Friends.js";
const FindFriends = new RedisFriendStorage();

export async function searchFriend(socket, email) {
  const [friend, sentRequests, conversations] = await Promise.all([
    FindFriends.searchFriend(email),
    FindFriends.getSentRequests(socket.user.userId),
    FindFriends.getConversations(socket.user.userId),
  ]);
  if (friend) {
    const request = sentRequests.find(
      (request) => request.userId === friend.userId
    );
    if (request) {
      friend.sentRequest = true;
      friend.isAdded = false;
    }
    if (conversations) {
      const user = conversations.find((user) => user.userId === friend.userId);
      if (user) {
        friend.sentRequest = false;
        friend.isAdded = true;
      }
    }
  }
  socket.emit("searchedFriend", friend);
}

export async function addFriend(socket, friend) {
  const currentUser = socket.user;
  const ok = await FindFriends.AddFriend(currentUser, friend);
  socket.to(friend.userId).emit("newRequest", currentUser);
}

export async function acceptRequest(socket, friend) {
  const currentUser = socket.user;
  const ok = await FindFriends.AcceptFriendRequest(currentUser, friend);
  socket.emit("newFriend", friend);
  socket.to(friend.userId).emit("newFriend", currentUser);
}
