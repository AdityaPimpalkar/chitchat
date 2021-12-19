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

  setMessage = (message) => {
    this.setState({ message });
  };

  sendMessage = () => {
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

  userConnected = ({ userId, username }) => {
    const user = { ...this.state.user };
    const selectedUser = { ...this.state.selectedUser };
    if (selectedUser.userId === userId) {
      selectedUser.connected = true;
      this.setState({ selectedUser });
    }
    if (user.userId !== userId) {
      const users = [...this.state.users];
      const user = users.find((user) => user.userId === userId);
      if (user) {
        this.handleConnectionStatus(user.userId, true);
      }
    }
  };

  userDisconnected = ({ userId }) => {
    const selectedUser = { ...this.state.selectedUser };
    if (selectedUser.userId === userId) {
      selectedUser.connected = false;
      this.setState({ selectedUser });
    }
    this.handleConnectionStatus(userId, false);
  };

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
      this.newDirectMessage(from, true);
    }
    this.directMessageNotify();
  };

  handleConnectionStatus = (userId, status) => {
    const users = [...this.state.users];
    const userIndex = users.findIndex((u) => u.userId === userId);
    if (userIndex >= 0) {
      users[userIndex].connected = status;
      this.setState({ users });
    }
  };

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
    return null;
  }
}

export default ChatEvents;
