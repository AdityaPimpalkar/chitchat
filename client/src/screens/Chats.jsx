import React, { useState, useEffect, useCallback } from "react";
import socket from "../www/socket";
import SocketEvents from "../events/constants";
import Container from "../layouts/Container";
import Sidebar from "../layouts/Sidebar";
import Content from "../layouts/Content";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Users from "../components/Users";
import Conversations from "../components/Conversations";

const Chats = (props) => {
  const [loggedInUser] = useState(props.user);
  const [chats, setChats] = useState(props.users);
  const [groups, setGroups] = useState(props.groups);
  const [requests, setRequests] = useState(props.friendRequests);
  const [isConnected, setIsConnected] = useState(props.isConnected);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedGroup, setSelectedGroup] = useState({});
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
    socket.on(SocketEvents.USER_DISCONNECTED, (user) => {
      userConnectionStatus(user, false);
    });
    return () => {
      socket.off(SocketEvents.USER_CONNECTED);
      socket.off(SocketEvents.USER_DISCONNECTED);
    };
  }, [userConnectionStatus]);

  const toggleNavigation = (tab) => {
    setNavigation(tab);
    if (tab === "CHATS") setNewChatMessage(false);
    else if (tab === "GROUPS") setNewGroupMessage(false);
    else if (tab === "REQUESTS") setNewFriendRequest(false);
  };

  const selectUser = (user) => {
    setSelectedUser(user);
    socket.emit(SocketEvents.USER_MESSAGES, user);
    newDirectMessage(selectedUser.userId, false);
  };

  const newDirectMessage = (userId, status, content) => {
    const userIndex = chats.findIndex((u) => u.userId === userId);
    if (userIndex >= 0) {
      chats[userIndex].hasNewMessage = status;
      if (content) {
        chats[userIndex].lastMessage = { content };
      }
      setChats([...chats]);
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
          <Users
            loggedInUser={loggedInUser}
            users={chats}
            selectUser={(user) => selectUser(user)}
          />
        )}
      </Sidebar>
      <Content>
        {selectedUser.userId && (
          <Conversations
            selectedUser={selectedUser}
            loggedInUser={loggedInUser}
            newDirectMessage={() => newDirectMessage()}
            isConnected={isConnected}
          />
        )}
      </Content>
    </Container>
  );
};

export default Chats;
