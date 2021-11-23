import { Component } from "react";

class ChatEvents extends Component {
  state = {
    socket: {},
    user: {},
    users: [],
    groups: [],
    selectedUser: {},
    selectedGroup: {},
    message: "",
    messages: [],
    newGroup: false,
  };

  userMessages = ({ messages }) => {
    const chatMessages = [];
    messages.forEach(({ content, from }) => {
      chatMessages.push({ userId: from, message: content });
    });
    this.setState({ messages: chatMessages });
  };

  userConnected = ({ userId, username }) => {
    const user = { ...this.state.user };
    if (user.userId !== userId) {
      const users = [...this.state.users];
      const user = users.find((user) => user.userId === userId);
      if (user) {
        this.handleConnectionStatus(user.userId, true);
      } else {
        const newUser = { userId, username, connected: true };
        this.setState({ users: [...users, newUser] });
      }
    }
  };

  userDisconnected = ({ userId }) => this.handleConnectionStatus(userId, false);

  privateMessage = ({ content, from, to }) => {
    const selectedUser = { ...this.state.selectedUser };
    if (selectedUser.userId === from) {
      const newMessage = {
        userId: from,
        message: content,
      };
      const messages = [...this.state.messages];
      this.setState({ messages: [...messages, newMessage] });
    } else {
      this.handleNewMessageStatus(from, true);
    }
  };

  handleConnectionStatus = (userId, status) => {
    const users = [...this.state.users];
    const userIndex = users.findIndex((u) => u.userId === userId);
    if (userIndex >= 0) {
      users[userIndex].connected = status;
      this.setState({ users });
    }
  };

  handleNewMessageStatus = (userId, status) => {
    const users = [...this.state.users];
    const userIndex = users.findIndex((u) => u.userId === userId);
    if (userIndex >= 0) {
      users[userIndex].hasNewMessage = status;
      this.setState({ users });
    }
  };

  toggleNewGroup = (status) => {
    this.setState({
      newGroup: status,
      selectedUser: {},
      selectedGroup: {},
      message: "",
      messages: [],
    });
  };

  newGroup = (group) => {
    const groups = [...this.state.groups];
    groups.push(group);
    this.setState({ groups });
    const { groupId } = group;
    this.handleNewGroupMessageStatus(groupId, true);
  };

  groupCreated = (group) => {
    const groups = [...this.state.groups];
    groups.push(group);
    this.setState({ selectedGroup: group, groups, newGroup: false });
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

  groupMessages = (messages) => {
    this.setState({ messages });
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
