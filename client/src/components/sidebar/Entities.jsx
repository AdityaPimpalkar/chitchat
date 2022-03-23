import React from "react";
import { useSelector } from "react-redux";
import Conversations from "../entities/Conversations";
import SearchFriends from "../entities/SearchFriends";
import FriendRequests from "../entities/FriendRequests";

const Entities = () => {
  const navigation = useSelector((state) => state.navigation.currentTab);
  return (
    <React.Fragment>
      {navigation === "CHATS" && <Conversations />}
      {navigation === "REQUESTS" && <FriendRequests />}
      {navigation === "SEARCH" && <SearchFriends />}
    </React.Fragment>
  );
};

export default Entities;
