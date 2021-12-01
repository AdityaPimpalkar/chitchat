import React from "react";
import socket from "./../www/socket";
import DirectMessageEvents from "./DirectMessageEvents";
import ChatWindow from "../layouts/ChatWindow";
import Header from "../screens/directMessage/Header";
import Body from "../screens/directMessage/Body";
import Input from "../screens/directMessage/Input";
import ChatEntity from "../layouts/ChatEntity";
import Users from "../screens/directMessage/Users";

class DirectMessage extends DirectMessageEvents {
  constructor(props) {
    super(props);
    this.state = {
      socket,
      user: this.props.user,
      users: this.props.users,
      selectedUser: {},
      message: "",
      messages: [],
    };
  }

  componentDidMount() {
    socket.on("user connected", (user) => this.userConnected(user));
    socket.on("user disconnected", (user) => this.userDisconnected(user));
    socket.on("private message", (message) => this.privateMessage(message));
    socket.on("user messages", (messages) => this.userMessages(messages));
    socket.on("newFriend", (friend) => this.newFriend(friend));
  }

  render() {
    const { user, selectedUser, message, users, messages } = this.state;
    return (
      <ChatWindow>
        <Users users={users} selectUser={this.selectUser} />
        <ChatEntity>
          {selectedUser.userId && (
            <React.Fragment>
              <Header user={selectedUser} />
              <Body user={selectedUser} messages={messages} />
              <Input
                message={message}
                setMessage={this.setMessage}
                sendMessage={this.sendMessage}
              />
            </React.Fragment>
          )}
        </ChatEntity>
      </ChatWindow>
    );
  }
}

export default DirectMessage;
