import React, { Component } from "react";
import _ from "lodash";
import socket from "../www/socket";
import DirectMessage from "./DirectMessage";
import GroupMessage from "./GroupMessage";
import FindFriends from "./Friends";
import NavigationButtons from "./NavigationButtons";
import Chats from "./Chats";
import Search from "./Search";
import ChatEvents from "./ChatEvents";
import ChatContainer from "../layouts/ChatContainer";
import ChatWindow from "../layouts/ChatWindow";
import Navigation from "../layouts/Navigation";

import Header from "../screens/directMessage/Header";
import Body from "../screens/directMessage/Body";
import Input from "../screens/directMessage/Input";

class Chat extends ChatEvents {
  constructor(props) {
    super(props);
    this.state = {
      socket,
      user: this.props.user,
      users: [],
      selectedUser: {},
      message: "",
      messages: [],
      groups: this.props.groups,
      selectedGroup: {},
      newGroup: false,
      friendRequests: this.props.friendRequests,
      directMessage: true,
      directMessageNotification: false,
      group: false,
      groupNotification: false,
      friends: false,
      friendsNotification: false,
    };
  }

  componentDidMount() {
    socket.on("user connected", (user) => this.userConnected(user));
    socket.on("user disconnected", (user) => this.userDisconnected(user));
    socket.on("private message", (message) => this.privateMessage(message));
    socket.on("user messages", (messages) => this.userMessages(messages));
    socket.on("newRequest", (friend) => this.newRequest(friend));
    socket.on("newFriend", (friend) => this.newFriend(friend));
  }

  render() {
    const {
      user,
      users,
      groups,
      friendRequests,
      directMessage,
      directMessageNotification,
      group,
      groupNotification,
      friends,
      friendsNotification,
      selectedUser,
      message,
      messages,
    } = this.state;
    console.log(users.length);
    return (
      <ChatContainer>
        <Navigation user={user} />
        <ChatWindow>
          <div className="w-30 overflow-hidden position-sticky">
            <Search placeholder="Search..." />
            <NavigationButtons
              toggleChats={this.toggleChats}
              toggleGroups={this.toggleGroups}
              toggleFriends={this.toggleFriends}
              directMessage={directMessage}
              directMessageNotification={directMessageNotification}
              group={group}
              groupNotification={groupNotification}
              friends={friends}
              friendsNotification={friendsNotification}
            />
            {directMessage && (
              <Chats users={users} selectUser={this.selectUser} />
            )}
          </div>
          <div className="w-70">
            {_.isEmpty(selectedUser) === false && (
              <React.Fragment>
                <Header user={user} />
                {/* <Body user={selectedUser} messages={messages} /> */}
                <Input
                  message={message}
                  setMessage={this.setMessage}
                  sendMessage={this.sendMessage}
                />
              </React.Fragment>
            )}
          </div>
        </ChatWindow>

        {/* {directMessage && (
          <DirectMessage
            user={user}
            users={users}
            directMessageNotify={this.directMessageNotify}
            newDirectMessage={this.newDirectMessage}
          />
        )}
        {group && <GroupMessage user={user} users={users} groups={groups} />}
        {friends && (
          <FindFriends
            friendRequests={friendRequests}
            updateRequests={this.updateRequests}
          />
        )} */}
      </ChatContainer>
    );
  }
}

export default Chat;
