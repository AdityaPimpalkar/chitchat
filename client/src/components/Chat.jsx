import React, { Component } from "react";
import socket from "./../www/socket";
import DirectMessage from "./DirectMessage";
import GroupMessage from "./GroupMessage";
import FindFriends from "./Friends";
import ChatContainer from "../layouts/ChatContainer";
import Navigation from "../layouts/Navigation";

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket,
      user: this.props.user,
      users: this.props.users,
      groups: this.props.groups,
      friendRequests: this.props.friendRequests,
      directMessage: true,
      directMessageNotification: false,
      group: false,
      groupNotification: false,
      friends: false,
      friendsNotification: false,
    };
  }

  componentDidMount() {
    socket.on("newRequest", (friend) => this.newRequest(friend));
    socket.on("newFriend", (friend) => this.newFriend(friend));
  }

  toggleChats = () => {
    this.setState({
      directMessage: true,
      directMessageNotification: false,
      group: false,
      friends: false,
    });
  };

  toggleGroups = () => {
    this.setState({
      directMessage: false,
      group: true,
      groupNotification: false,
      friends: false,
    });
  };

  toggleFriends = () => {
    this.setState({
      directMessage: false,
      group: false,
      friends: true,
      friendsNotification: false,
    });
  };

  newRequest = (friend) => {
    const { friendRequests } = this.state;
    this.setState({ friendRequests: [friend, ...friendRequests] });
  };

  newFriend = (friend) => {
    let { users } = this.state;
    this.setState({ users: [friend, ...users] });
  };

  directMessageNotify = () => {
    const { directMessage } = this.state;
    if (directMessage === false) {
      this.setState({ directMessageNotification: true });
    }
  };

  newDirectMessage = (userId, status) => {
    const users = [...this.state.users];
    const userIndex = users.findIndex((u) => u.userId === userId);
    if (userIndex >= 0) {
      users[userIndex].hasNewMessage = status;
      this.setState({ users });
    }
  };

  openChat = (friend) => {
    this.toggleChats();
  };

  updateRequests = (requests) => {
    this.setState({ friendRequests: requests });
  };

  render() {
    const {
      user,
      users,
      groups,
      friendRequests,
      directMessage,
      directMessageNotification,
      group,
      groupNotification,
      friends,
      friendsNotification,
    } = this.state;
    return (
      <ChatContainer>
        <Navigation
          user={user}
          toggleChats={this.toggleChats}
          toggleGroups={this.toggleGroups}
          toggleFriends={this.toggleFriends}
          directMessage={directMessage}
          directMessageNotification={directMessageNotification}
          group={group}
          groupNotification={groupNotification}
          friends={friends}
          friendsNotification={friendsNotification}
        />
        {directMessage && (
          <DirectMessage
            user={user}
            users={users}
            directMessageNotify={this.directMessageNotify}
            newDirectMessage={this.newDirectMessage}
          />
        )}
        {group && <GroupMessage user={user} users={users} groups={groups} />}
        {friends && (
          <FindFriends
            friendRequests={friendRequests}
            updateRequests={this.updateRequests}
          />
        )}
      </ChatContainer>
    );
  }
}

export default Chat;
