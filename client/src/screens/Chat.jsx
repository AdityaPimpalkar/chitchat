import React, { Component } from "react";
import _ from "lodash";
import socket from "../www/socket";
import ChatEvents from "../events/ChatEvents";
import Container from "../layouts/Container";
import Sidebar from "../layouts/Sidebar";
import Content from "../layouts/Content";
import Header from "../components/Header";
import NavigationButtons from "../components/NavigationButtons";
import Search from "../components/Search";
import Users from "../components/Users";
import ChatInput from "../components/ChatInput";
import DiretMessages from "../components/DirectMessages";
import ChatHeader from "../components/ChatHeader";
import FriendRequests from "../components/FriendRequests";
import SearchFriends from "../components/SearchFriends";

class Chat extends ChatEvents {
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
      <Container>
        <Sidebar>
          <Header user={this.state.user} />
          <NavigationButtons
            toggleChats={this.toggleChats}
            toggleGroups={this.toggleGroups}
            toggleFriends={this.toggleFriends}
            toggleSearchFriends={this.toggleSearchFriends}
            directMessage={this.state.directMessage}
            directMessageNotification={this.state.directMessageNotification}
            group={this.state.group}
            groupNotification={this.state.groupNotification}
            friends={this.state.friends}
            friendsNotification={this.state.friendsNotification}
            searchFriends={this.state.searchFriends}
          />
          <Search />
          {this.state.directMessage && (
            <Users users={this.state.users} selectUser={this.selectUser} />
          )}
          {this.state.friends && (
            <FriendRequests friendRequests={this.state.users} />
          )}
          {this.state.searchFriends && (
            <SearchFriends users={this.state.users} />
          )}
        </Sidebar>
        <Content>
          {!_.isEmpty(this.state.selectedUser) && (
            <React.Fragment>
              <ChatHeader user={this.state.selectedUser} />
              <DiretMessages
                user={this.state.user}
                messages={this.state.messages}
              />
              <ChatInput
                message={this.state.message}
                setMessage={this.setMessage}
                sendMessage={this.sendMessage}
              />
            </React.Fragment>
          )}
        </Content>
      </Container>
    );
  }
}

export default Chat;
