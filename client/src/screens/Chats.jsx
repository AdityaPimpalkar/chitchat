import React, { useState, useEffect } from "react";
import socket from "../www/socket";
const Chats = (props) => {
  const [loggedInUser] = useState(props.user);
  const [chats, setChats] = useState(props.users);
  const [groups, setGroups] = useState(props.groups);
  const [requests, setRequests] = useState(props.friendRequests);
  const [isConnected] = useState(props.isConnected);
  const [selectedUser, setSelectedUser] = useState({});
  const [selectedGroup, setSelectedGroup] = useState({});
  const [userDetail, setUserDetail] = useState({});
  const [navigation, setNavigation] = useState("CHATS");
  const [newChatMessage, setNewChatMessage] = useState(false);
  const [newGroupMessage, setNewGroupMessage] = useState(false);
  const [newFriendRequest, setNewFriendRequest] = useState(false);

  const toggleNavigation = (tab) => {
    setNavigation(tab);
    if (tab === "CHATS") setNewChatMessage(false);
    else if (tab === "GROUPS") setNewGroupMessage(false);
    else if (tab === "REQUESTS") setNewFriendRequest(false);
  };

  return null;
};

export default Chats;
