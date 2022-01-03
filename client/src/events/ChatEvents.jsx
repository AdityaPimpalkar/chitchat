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

  setSearch = (text) => {
    this.setState({ search: text });
  };

  onSearch = () => {
    const search = this.state.search;
    const directMessage = this.state.directMessage;
    const group = this.state.group;
    const friends = this.state.friends;

    if (directMessage) {
    } else if (group) {
    } else if (friends) {
    } else {
      socket.emit("searchFriend", search);
    }
  };

  searchedFriend = (friend) => {
    if (friend) {
      this.setState({ searchedFriends: [{ ...friend }] });
    } else {
      this.setState({ searchedFriends: [] });
    }
    this.setState({ isLoading: false });
  };

  selectUser = (selectedUser) => {
    this.setState({
      selectedUser,
      message: "",
      messages: [],
    });
    const socket = this.state.socket;
    socket.emit("user messages", selectedUser);
    this.newDirectMessage(selectedUser.userId, false);
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

  newDirectMessage = (userId, status) => {
    const users = [...this.state.users];
    const userIndex = users.findIndex((u) => u.userId === userId);
    if (userIndex >= 0) {
      users[userIndex].hasNewMessage = status;
      this.setState({ users });
    }
  };

  setMessage = (message) => {
    this.setState({ message });
  };

  sendDirectMessage = () => {
    const socket = this.state.socket;
    const message = this.state.message;
    const user = { ...this.state.user };
    const selectedUser = { ...this.state.selectedUser };
    const messages = [...this.state.messages];

    socket.emit("private message", {
      content: message,
      to: selectedUser.userId,
    });

    const newMessage = {
      userId: user.userId,
      username: user.username,
      message,
    };

    this.setState({ messages: [...messages, newMessage], message: "" });
  };

  sendMessage = () => {
    const directMessage = this.state.directMessage;
    const group = this.state.group;

    if (directMessage) {
      this.sendDirectMessage();
    } else if (group) {
      this.sendGroupMessage();
    }
  };

  selectGroup = (selectedGroup) => {
    this.setState({
      selectedGroup,
      newGroup: false,
      message: "",
      messages: [],
    });
    const socket = this.state.socket;
    socket.emit("group messages", selectedGroup.groupId);
    this.handleNewGroupMessageStatus(selectedGroup.groupId, false);
  };

  groupMessage = ({ groupId, message }) => {
    const selectedGroup = { ...this.state.selectedGroup };
    if (selectedGroup.groupId === groupId) {
      const messages = [...this.state.messages];
      this.setState({ messages: [...messages, message] });
    } else {
      this.handleNewGroupMessageStatus(groupId, true);
    }
  };

  sendGroupMessage = () => {
    const socket = this.state.socket;
    const group = { ...this.state.selectedGroup };
    const message = this.state.message;
    const user = { ...this.state.user };
    const messages = [...this.state.messages];

    const newMessage = {
      from: user.userId,
      username: user.username,
      message,
    };

    this.setState({ messages: [...messages, newMessage], message: "" });

    socket.emit("group message", {
      groupId: group.groupId,
      message: newMessage,
    });
  };

  newGroup = (group) => {
    const groups = [...this.state.groups];
    groups.push(group);
    this.setState({ groups });
    const { groupId } = group;
    this.handleNewGroupMessageStatus(groupId, true);
  };

  createGroup = (group) => {
    const socket = this.state.socket;
    socket.emit("new group", group);
  };

  groupCreated = (group) => {
    const groups = [...this.state.groups];
    groups.push(group);
    this.setState({ selectedGroup: group, groups, newGroup: false });
  };

  handleNewGroupMessageStatus = (groupId, status) => {
    const groups = [...this.state.groups];
    const groupIndex = groups.findIndex((u) => u.groupId === groupId);
    if (groupIndex >= 0) {
      groups[groupIndex].hasNewMessage = status;
      this.setState({ groups });
    }
  };

  render() {
    return null;
  }
}

export default ChatEvents;
