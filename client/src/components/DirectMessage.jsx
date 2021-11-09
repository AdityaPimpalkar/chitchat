import React from "react";
import socket from "./../www/socket";
import DirectMessageEvents from "./DirectMessageEvents";

import Header from "../screens/directMessage/Header";
import Body from "../screens/directMessage/Body";
import Input from "../screens/directMessage/Input";

class DirectMessage extends DirectMessageEvents {
  constructor(props) {
    super(props);
    this.state = {
      socket,
      user: this.props.user,
      message: "",
      messages: [],
    };
  }

  componentDidMount() {
    socket.on("private message", (message) => this.privateMessage(message));
    socket.on("user messages", (messages) => this.userMessages(messages));
  }

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

  render() {
    const { user, message, messages } = this.state;
    return (
      <React.Fragment>
        <Header user={user} />
        <Body user={user} messages={messages} />
        <Input
          message={message}
          setMessage={this.setMessage}
          sendMessage={this.sendMessage}
        />
      </React.Fragment>
    );
  }
}

export default DirectMessage;
