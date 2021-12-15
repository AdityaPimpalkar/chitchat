import React from "react";
import _ from "lodash";
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
      requests: this.props.friendRequests,
      friends: [],
      selectedFriend: {},
      isLoading: false,
      findFriends: false,
      friendRequests: true,
    };
  }

  render() {
    const {
      search,
      requests,
      friends,
      selectedFriend,
      isLoading,
      findFriends,
      friendRequests,
    } = this.state;
    return (
      <ChatWindow>
        <Friends
          search={search}
          requests={requests}
          friends={friends}
          selectFriend={this.selectFriend}
          setSearch={this.setSearch}
          searchFriend={this.searchFriend}
          isLoading={isLoading}
          findFriends={findFriends}
          friendRequests={friendRequests}
          toggleFindFriends={this.toggleFindFriends}
          toggleFriendRequests={this.toggleFriendRequests}
          acceptRequest={this.acceptRequest}
        />
        <ChatEntity hasSpacing={true}>
          {!_.isEmpty(selectedFriend) && (
            <Body
              selectedFriend={selectedFriend}
              addFriend={this.addFriend}
              openChat={this.openChat}
              findFriends={findFriends}
              friendRequests={friendRequests}
              acceptRequest={this.acceptRequest}
            />
          )}
        </ChatEntity>
      </ChatWindow>
    );
  }
}

export default FindFriends;
