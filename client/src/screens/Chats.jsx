import React, { useState, useEffect, useCallback } from "react";
import socket from "../www/socket";
import SocketEvents from "../events/constants";
import Container from "../layouts/Container";
import Sidebar from "../layouts/Sidebar";
import Content from "../layouts/Content";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Conversations from "../components/directMessage/Conversations";
import DirectMessage from "../components/DirectMessage";
import SearchFriends from "../components/SearchFriends";
import UserDetails from "../components/UserDetails";
import FriendRequests from "../components/FriendRequests";

const Chats = (props) => {
  const [loggedInUser] = useState(props.user);
  const [chats, setChats] = useState(props.users);
  // const [groups, setGroups] = useState(props.groups);
  const [requests, setRequests] = useState(props.friendRequests);
  const [isConnected, setIsConnected] = useState(props.isConnected);
  const [selectedUser, setSelectedUser] = useState({});
  // const [selectedGroup, setSelectedGroup] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const [navigation, setNavigation] = useState("CHATS");
  const [newChatMessage, setNewChatMessage] = useState(false);
  const [newGroupMessage, setNewGroupMessage] = useState(false);
  const [newFriendRequest, setNewFriendRequest] = useState(false);

  const userConnectionStatus = useCallback(
    (connectedUser, status) => {
      if (selectedUser.userId === connectedUser.userId) {
        setSelectedUser({
          ...selectedUser,
          connected: status,
          lastSeen: connectedUser.lastSeen,
        });
      }
    },
    [selectedUser]
  );

  const newPrivateMessage = useCallback(
    ({ content, from, to, sentOn }) => {
      if (selectedUser.userId !== from) {
        const userIndex = chats.findIndex((u) => u.userId === from);
        if (userIndex >= 0) {
          chats[userIndex].hasNewMessage = true;
          if (content) {
            chats[userIndex].lastMessage = { content, from, to, sentOn };
          }
          setChats([...chats]);
        }
        if (newChatMessage === false) setNewChatMessage(true);
      }
    },
    [selectedUser, chats, newChatMessage]
  );

  const newRequest = useCallback(
    (friend) => {
      setNewFriendRequest(true);
      setRequests([friend, ...requests]);
    },
    [requests]
  );

  const newFriend = useCallback(
    (friend) => {
      if (navigation !== "CHATS") setNewChatMessage(true);
      friend.hasNewMessage = true;
      setChats([friend, ...chats]);
    },
    [navigation, chats]
  );

  useEffect(() => {
    socket.on(SocketEvents.CONNECT, () => {
      setIsConnected(true);
    });

    socket.on(SocketEvents.DISCONNECT, () => {
      setIsConnected(false);
    });

    socket.on(SocketEvents.CONNECT_ERROR, function (err) {
      setIsConnected(false);
    });

    return () => {
      socket.off(SocketEvents.CONNECT);
      socket.off(SocketEvents.DISCONNECT);
      socket.off(SocketEvents.CONNECT_ERROR);
    };
  }, []);

  useEffect(() => {
    socket.on(SocketEvents.USER_CONNECTED, (user) =>
      userConnectionStatus(user, true)
    );
    socket.on(SocketEvents.USER_DISCONNECTED, (user) =>
      userConnectionStatus(user, false)
    );
    return () => {
      socket.off(SocketEvents.USER_CONNECTED);
      socket.off(SocketEvents.USER_DISCONNECTED);
    };
  }, [userConnectionStatus]);

  useEffect(() => {
    socket.on(SocketEvents.PRIVATE_MESSAGE, (message) =>
      newPrivateMessage(message)
    );

    return () => socket.off(SocketEvents.PRIVATE_MESSAGE);
  }, [newPrivateMessage]);

  useEffect(() => {
    socket.on(SocketEvents.NEW_REQUEST, (request) => newRequest(request));
    socket.on(SocketEvents.NEW_FRIEND, (friend) => newFriend(friend));
    return () => {
      socket.off(SocketEvents.NEW_REQUEST);
      socket.off(SocketEvents.NEW_FRIEND);
    };
  }, [newRequest, newFriend]);

  const toggleNavigation = (tab) => {
    setNavigation(tab);
    setSelectedUser({});
    // setSelectedGroup({});
    setUserDetail({});
    if (tab === "CHATS") setNewChatMessage(false);
    else if (tab === "GROUPS") setNewGroupMessage(false);
    else if (tab === "REQUESTS") setNewFriendRequest(false);
  };

  const selectUser = (user) => {
    setSelectedUser({ ...user });
    socket.emit(SocketEvents.USER_MESSAGES, user);
    newDirectMessage(user.userId, false);
    setNewChatMessage(false);
  };

  const newDirectMessage = (userId, status, content) => {
    const userIndex = chats.findIndex((u) => u.userId === userId);
    if (userIndex >= 0) {
      chats[userIndex].hasNewMessage = status;
      if (content) {
        chats[userIndex].lastMessage = { ...content };
      }
      setChats([...chats]);
    }
    if (navigation !== "CHATS" && status === true) setNewChatMessage(true);
  };

  const selectFriend = (user) => {
    setUserDetail(user);
  };

  const openChat = (user) => {
    setNavigation("CHATS");
    selectUser(user);
  };

  const acceptRequest = (friend) => {
    const requestsArr = [...requests];
    const friendRequests = requests.filter(
      (request) => request.userId !== friend.userId
    );
    setRequests([...friendRequests]);
    setUserDetail({});
    socket.emit(SocketEvents.ACCEPT_REQUEST, friend, ({ result, error }) => {
      if (error) {
        setRequests([...requestsArr]);
        setUserDetail(friend);
        console.log(error);
      }
    });
  };

  const addFriend = (friend) => {
    if (friend.userId === userDetail.userId) {
      friend.sentRequest = true;
      friend.isAdded = false;
      setUserDetail({});
      setUserDetail({ ...friend });
      socket.emit(SocketEvents.ADD_FRIEND, friend, ({ result, error }) => {
        if (!result) {
          friend.sentRequest = false;
          friend.isAdded = false;
          setUserDetail({ ...friend });
        }
        if (error) {
          console.log(error);
        }
      });
    }
  };

  return (
    <Container>
      <Sidebar>
        <Header user={loggedInUser} isConnected={isConnected} />
        <Navigation
          navigation={navigation}
          toggleNavigation={(tab) => toggleNavigation(tab)}
          newChatMessage={newChatMessage}
          newGroupMessage={newGroupMessage}
          newFriendRequest={newFriendRequest}
        />
        {navigation === "CHATS" && (
          <Conversations
            loggedInUser={loggedInUser}
            users={chats}
            selectUser={(user) => selectUser(user)}
          />
        )}
        {navigation === "REQUESTS" && (
          <FriendRequests
            friendRequests={requests}
            selectFriend={(user) => selectFriend(user)}
            acceptRequest={(friend) => acceptRequest(friend)}
          />
        )}
        {navigation === "SEARCH" && (
          <SearchFriends
            selectFriend={(user) => selectFriend(user)}
            openChat={(user) => openChat(user)}
          />
        )}
      </Sidebar>
      <Content>
        {selectedUser.userId && (
          <DirectMessage
            selectedUser={selectedUser}
            loggedInUser={loggedInUser}
            newDirectMessage={(userId, status, content) =>
              newDirectMessage(userId, status, content)
            }
            isConnected={isConnected}
          />
        )}
        {userDetail.userId && (
          <UserDetails
            user={userDetail}
            searchFriends={navigation === "SEARCH"}
            addFriend={(friend) => addFriend(friend)}
            acceptRequest={(user) => acceptRequest(user)}
            openChat={(user) => openChat(user)}
          />
        )}
      </Content>
    </Container>
  );
};

export default Chats;
