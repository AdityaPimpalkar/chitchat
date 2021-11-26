import React from "react";
import _ from "lodash";
import socket from "../www/socket";
import FindFriendsEvents from "./FindFriendsEvents";
import ChatWindow from "../layouts/ChatWindow";
import ChatEntity from "../layouts/ChatEntity";
import Friends from "../screens/friends/Friends";
import Body from "../screens/friends/Body";

class FindFriends extends FindFriendsEvents {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      friends: [],
      selectedFriend: {},
      isLoading: false,
    };
  }

  render() {
    const { search, friends, selectedFriend, isLoading } = this.state;
    return (
      <ChatWindow>
        <Friends
          search={search}
          friends={friends}
          selectFriend={this.selectFriend}
          setSearch={this.setSearch}
          searchFriend={this.searchFriend}
          isLoading={isLoading}
        />
        <ChatEntity friends={true}>
          {!_.isEmpty(selectedFriend) && (
            <Body selectedFriend={selectedFriend} />
          )}
        </ChatEntity>
      </ChatWindow>
    );
  }
}

export default FindFriends;
