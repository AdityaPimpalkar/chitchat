import { socket } from "../../socket.js";
import { decodeToken } from "../config/jwt.js";
import socketEvents from "../config/socketEvents.js";
import { RedisFriendStorage } from "../services/friends.js";

const FindFriends = new RedisFriendStorage();

export async function searchFriend(email, callback) {
  const isValid = decodeToken(socket.token);
  if (isValid) {
    try {
      const user = await searchedFriend(email);
      //if searched email exists in database
      if (user !== null && user?.userId !== socket.user.userId) {
        const sentRequests = await getSentRequests(socket.user.userId);
        //check if sender has already sent a request to the searched user.
        const request = sentRequests.find(
          (request) => request.userId === user.userId
        );
        if (request) {
          //if requests exists add sent request check
          user.sentRequest = true;
          user.isAdded = false;
        } else {
          const receivedRequests = await getFriendRequests(socket.user.userId);
          //check if sender already has a friend request sent by the user
          const friendRequest = receivedRequests.find(
            (request) => request.userId === user.userId
          );
          if (friendRequest) {
            //if friend request exists add has requested check
            user.hasRequested = true;
          } else {
            const conversations = await getConversations(socket.user.userId);
            //check if searched user is already added.
            const inConversation = conversations.find(
              (convUser) => convUser.userId === user.userId
            );
            if (inConversation) {
              user.sentRequest = false;
              user.isAdded = true;
            } else {
              user.sentRequest = false;
              user.isAdded = false;
            }
          }
        }
        callback({
          result: true,
          error: null,
          data: user,
        });
      } else {
        callback({
          result: true,
          error: null,
          data: null,
        });
      }
    } catch (error) {
      callback({
        result: false,
        error,
        data: null,
      });
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

export async function addFriend(friend, callback) {
  try {
    const currentUser = socket.user;
    const [conversations, requests] = await Promise.all([
      getConversations(currentUser.userId),
      getFriendRequests(currentUser.userId),
    ]);
    const isAdded = conversations.find((user) => user.userId === friend.userId);
    const hasRequested = requests.find((user) => user.userId === friend.userId);
    if (isAdded === undefined && hasRequested === undefined) {
      await FindFriends.AddFriend(currentUser, friend);
      socket.to(friend.userId).emit(socketEvents.NEW_REQUEST, currentUser);
      callback({
        result: true,
        error: null,
      });
    } else {
      callback({
        result: false,
        error:
          isAdded != undefined
            ? "This user is already added. "
            : "You have already requested this user.",
      });
    }
  } catch (error) {
    callback({
      result: false,
      error: error.message,
    });
  }
}

export async function acceptRequest(friend, callback) {
  const isValid = decodeToken(socket.token);
  if (isValid) {
    try {
      const currentUser = socket.user;
      const [conversations, requests] = await Promise.all([
        getConversations(currentUser.userId),
        getFriendRequests(currentUser.userId),
      ]);
      const isAdded = conversations.find(
        (user) => user.userId === friend.userId
      );
      const hasRequested = requests.find(
        (user) => user.userId === friend.userId
      );

      if (isAdded === undefined && hasRequested != undefined) {
        await FindFriends.AcceptFriendRequest(currentUser, friend);
        socket.to(friend.userId).emit(socketEvents.NEW_FRIEND, currentUser);
        socket.emit(socketEvents.NEW_FRIEND, friend);
        callback({
          result: true,
          error: null,
        });
      } else {
        if (isAdded != undefined) {
          callback({
            result: false,
            error: "This user is already added.",
          });
        } else {
          callback({
            result: false,
            error: "This request dosent exists.",
          });
        }
      }
    } catch (error) {
      callback({
        result: false,
        error: error.message,
      });
    }
  } else {
    throw new Error("Invalid token.");
  }
}
