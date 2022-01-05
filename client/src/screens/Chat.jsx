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
import Groups from "../components/Groups";
import ChatInput from "../components/ChatInput";
import DiretMessages from "../components/DirectMessages";
import ChatHeader from "../components/ChatHeader";
import FriendRequests from "../components/FriendRequests";
import SearchFriends from "../components/SearchFriends";
import UserDetails from "../components/UserDetails";

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
      userDetail: {},
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

    // SEARCH FRIENDS
    socket.on("searchedFriend", (friend) => this.searchedFriend(friend));
    socket.on("newRequest", (friend) => this.newRequest(friend));

    socket.on("newFriend", (friend) => this.newFriend(friend));

    socket.on("new group", (group) => this.newGroup(group));
    socket.on("group created", (group) => this.groupCreated(group));
    socket.on("group message", (groupMessage) =>
      this.groupMessage(groupMessage)
    );
    socket.on("group messages", (groupMessages) =>
      this.groupMessages(groupMessages)
    );
  }

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
          <Search
            placeholder="Search"
            value={this.state.search}
            onChange={this.setSearch}
            onKeyPress={this.onSearch}
          />
          {this.state.directMessage && (
            <Users
              loggedInUser={this.state.user}
              users={this.state.users}
              selectUser={this.selectUser}
            />
          )}
          {this.state.group && (
            <Groups
              user={this.state.user}
              groups={this.state.groups}
              selectGroup={this.selectGroup}
            />
          )}
          {this.state.friends && (
            <FriendRequests friendRequests={this.state.friendRequests} />
          )}
          {this.state.searchFriends && (
            <SearchFriends
              users={this.state.searchedFriends}
              openChat={this.openChat}
              selectFriend={this.moreUserDetails}
            />
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
          {!_.isEmpty(this.state.userDetail) && (
            <UserDetails
              user={this.state.userDetail}
              addFriend={this.addFriend}
              openChat={this.openChat}
            />
          )}
        </Content>
      </Container>
    );
  }
}

export default Chat;
