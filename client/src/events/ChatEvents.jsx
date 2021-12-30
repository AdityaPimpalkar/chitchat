import React, { Component } from "react";
import socket from "../www/socket";
class ChatEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket,
      user: this.props.user,
      users: this.props.users,
      groups: this.props.groups,
      friendRequests: this.props.friendRequests,
      searchedFriends: [],
      selectedUser: {},
      selectedGroup: {},
      directMessage: true,
      directMessageNotification: false,
      group: false,
      groupNotification: false,
      newGroup: false,
      friends: false,
      friendsNotification: false,
      searchFriends: false,
      message: "",
      messages: [],
      search: "",
    };
  }

  toggleChats = () => {
    this.setState({
      directMessage: true,
      directMessageNotification: false,
      group: false,
      friends: false,
      searchFriends: false,
    });
  };

  toggleGroups = () => {
    this.setState({
      directMessage: false,
      group: true,
      groupNotification: false,
      friends: false,
      searchFriends: false,
    });
  };

  toggleFriends = () => {
    this.setState({
      directMessage: false,
      group: false,
      friends: true,
      friendsNotification: false,
      searchFriends: false,
    });
  };

  toggleSearchFriends = () => {
    this.setState({
      directMessage: false,
      group: false,
      friends: false,
      searchFriends: true,
    });
  };

  newDirectMessage = (userId, status) => {
    const users = [...this.state.users];
    const userIndex = users.findIndex((u) => u.userId === userId);
    if (userIndex >= 0) {
      users[userIndex].hasNewMessage = status;
      this.setState({ users });
    }
  };

  userMessages = ({ userId, messages, connected }) => {
    const selectedUser = { ...this.state.selectedUser };
    if (selectedUser.userId === userId) {
      selectedUser.connected = connected;
      this.setState({ selectedUser });
    }
    const chatMessages = [];
    messages.forEach(({ content, from }) => {
      chatMessages.push({ userId: from, message: content });
    });
    this.setState({ messages: chatMessages });
  };

  setMessage = (message) => {
    this.setState({ message });
  };

  sendMessage = () => {
    const socket = this.state.socket;
    const message = this.state.message;
    const user = { ...this.state.user };
    const selectedUser = { ...this.state.selectedUser };
    const messages = [...this.state.messages];

    // socket.emit("private message", {
    //   content: message,
    //   to: selectedUser.userId,
    // });

    const newMessage = {
      userId: user.userId,
      username: user.username,
      message,
    };

    this.setState({ messages: [...messages, newMessage], message: "" });
  };

  render() {
    return null;
  }
}

export default ChatEvents;
