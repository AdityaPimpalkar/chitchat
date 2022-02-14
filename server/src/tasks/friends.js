import { socket } from "../../socket.js";
import { RedisFriendStorage } from "../services/friends.js";
const FindFriends = new RedisFriendStorage();

export async function searchFriend(email) {
  const [friend, sentRequests, receivedRequests, conversations] =
    await Promise.all([
      FindFriends.searchFriend(email),
      FindFriends.getSentRequests(socket.user.userId),
      FindFriends.getFriendRequests(socket.user.userId),
      FindFriends.getConversations(socket.user.userId),
    ]);
  if (friend) {
    const request = sentRequests.find(
      (request) => request.userId === friend.userId
    );
    if (request) {
      friend.sentRequest = true;
      friend.isAdded = false;
    } else {
      const friendRequest = receivedRequests.find(
        (request) => request.userId === friend.userId
      );
      if (friendRequest) {
        friend.hasRequested = true;
      } else {
        const user = conversations.find(
          (user) => user.userId === friend.userId
        );
        if (user) {
          friend.sentRequest = false;
          friend.isAdded = true;
        } else {
          friend.sentRequest = false;
          friend.isAdded = false;
        }
      }
    }
  }
  socket.emit("searchedFriend", friend);
}

export async function addFriend(friend) {
  const currentUser = socket.user;
  const ok = await FindFriends.AddFriend(currentUser, friend);
  socket.to(friend.userId).emit("newRequest", currentUser);
}

export async function acceptRequest(friend) {
  const currentUser = socket.user;
  const ok = await FindFriends.AcceptFriendRequest(currentUser, friend);
  friend.lastMessage = {};
  socket.emit("newFriend", friend);
  currentUser.lastMessage = {};
  socket.to(friend.userId).emit("newFriend", currentUser);
}
