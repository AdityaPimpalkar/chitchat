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
    const chatMessages = [];
    messages.forEach(({ content, from }) => {
      chatMessages.push({ userId: from, message: content });
    });
    this.setState({ messages: chatMessages });
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
      this.handleNewMessageStatus(from, true);
    }
  };

  render() {
    return null;
  }
}

export default DirectMessageEvents;
