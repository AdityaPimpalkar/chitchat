import { socket } from "../../socket.js";
import { decodeToken } from "../config/jwt.js";
import socketEvents from "../config/socketEvents.js";
import { RedisFriendStorage } from "../services/friends.js";

const FindFriends = new RedisFriendStorage();

export async function searchFriend(email) {
  const isValid = decodeToken(socket.token);
  if (isValid) {
    try {
      const [friend, sentRequests, receivedRequests, conversations] =
        await Promise.all([
          searchedFriend(email),
          getSentRequests(socket.user.userId),
          getFriendRequests(socket.user.userId),
          getConversations(socket.user.userId),
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

      socket.emit(socketEvents.SEARCH_FRIEND, friend);
    } catch (error) {
      throw error;
    }
  } else {
    throw new Error("Invalid token.");
  }
}

async function searchedFriend(email) {
  try {
    const searchedFriend = await FindFriends.searchFriend(email);
    if (searchedFriend.result) return searchedFriend.data;
    else throw searchedFriend.error;
  } catch (error) {
    throw error;
  }
}

async function getSentRequests(userId) {
  try {
    const sentRequests = await FindFriends.getSentRequests(userId);
    if (sentRequests.result) return sentRequests.data;
    else throw sentRequests.error;
  } catch (error) {
    throw error;
  }
}

async function getFriendRequests(userId) {
  try {
    const receivedRequests = await FindFriends.getFriendRequests(userId);
    if (receivedRequests.result) return receivedRequests.data;
    else throw receivedRequests.error;
  } catch (error) {
    throw error;
  }
}

async function getConversations(userId) {
  try {
    const conversations = await FindFriends.getConversations(userId);
    if (conversations.result) return conversations.data;
    else throw conversations.error;
  } catch (error) {
    throw error;
  }
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
