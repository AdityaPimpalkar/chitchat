import { Component } from "react";

class DirectMessageEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: {},
      user: {},
      users: [],
      selectedUser: {},
      message: "",
      messages: [],
    };
  }

  userMessages = ({ messages }) => {
    console.log("Hi!");
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

  render() {
    return null;
  }
}

export default DirectMessageEvents;
