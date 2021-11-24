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
      friends: [
        {
          image: "https://source.unsplash.com/150x150/?person",
          username: "Aditya Pimpalkar",
          email: "adipimpalkar@gmail.com",
          isAdded: true,
        },
      ],
      selectedFriend: {},
    };
  }
  render() {
    const { friends, selectedFriend } = this.state;
    return (
      <ChatWindow>
        <Friends friends={friends} selectFriend={this.selectFriend} />
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
