import React, { Component } from "react";
import _ from "lodash";
import socket from "../www/socket";
import ChatEvents from "../events/ChatEvents";
import Header from "../components/Header";
import ChatContainer from "../components/ChatContainer";
import NavigationButtons from "../components/NavigationButtons";
import Search from "../components/Search";
import Users from "../components/Users";
import ChatInput from "../components/ChatInput";
import DiretMessages from "../components/DirectMessages";
import ChatHeader from "../components/ChatHeader";

class Chat extends ChatEvents {
  constructor(props) {
    super(props);
    this.state = {
      socket,
      user: this.props.user,
      users: this.props.users,
      groups: this.props.groups,
      friendRequests: this.props.friendRequests,
      selectedUser: {},
      selectedGroup: {},
      directMessage: true,
      directMessageNotification: false,
      group: false,
      groupNotification: false,
      newGroup: false,
      friends: false,
      friendsNotification: false,
      message: "",
      messages: [],
      search: "",
    };
  }

  componentDidMount() {
    // socket.on("user connected", (user) => this.userConnected(user));
    // socket.on("user disconnected", (user) => this.userDisconnected(user));
    // socket.on("private message", (message) => this.privateMessage(message));
    socket.on("user messages", (messages) => this.userMessages(messages));
    // socket.on("newRequest", (friend) => this.newRequest(friend));
    //socket.on("newFriend", (friend) => this.newFriend(friend));
  }

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

  render() {
    return (
      <ChatContainer>
        <div className="w-30 flex flex-col bg-gray-100 bg-purple-900">
          <Header user={this.state.user} />
          <NavigationButtons
            toggleChats={this.toggleChats}
            toggleGroups={this.toggleGroups}
            toggleFriends={this.toggleFriends}
            directMessage={this.state.directMessage}
            directMessageNotification={this.state.directMessageNotification}
            group={this.state.group}
            groupNotification={this.state.groupNotification}
            friends={this.state.friends}
            friendsNotification={this.state.friendsNotification}
          />
          <Search />
          <Users users={this.state.users} selectUser={this.selectUser} />
        </div>
        <div className="w-70 flex flex-1 flex-col">
          {!_.isEmpty(this.state.selectedUser) && (
            <React.Fragment>
              <div className="flex">
                <ChatHeader user={this.state.selectedUser} />
              </div>
              <div className="flex flex-1 overflow-y-auto paragraph px-4">
                <DiretMessages
                  user={this.state.user}
                  messages={this.state.messages}
                />
              </div>
              <div className="flex">
                <ChatInput
                  message={this.state.message}
                  setMessage={this.setMessage}
                  sendMessage={this.sendMessage}
                />
              </div>
            </React.Fragment>
          )}
        </div>
      </ChatContainer>
    );
  }
}

export default Chat;
