import React from "react";
import ChatEvents from "./ChatEvents";
import NewGroup from "./NewGroup";
import ChatContainer from "../layouts/ChatContainer";
import ChatWindow from "../layouts/ChatWindow";
import ChatEntity from "../layouts/ChatEntity";
import Navigation from "../layouts/Navigation";
import Users from "../screens/directMessage/Users";
import DirectMessageBody from "../screens/directMessage/Body";
import DirectMessageHeader from "../screens/directMessage/Header";
import DirectMessageInput from "../screens/directMessage/Input";

import Groups from "../screens/group/Groups";
import GroupHeader from "../screens/group/Header";
import GroupInput from "../screens/group/Input";
import GroupBody from "../screens/group/Body";

import Friends from "../screens/friends/Friends";
import FriendBody from "../screens/friends/Body";
import FriendHeader from "../screens/friends/Header";

class Chat extends ChatEvents {
  constructor(props) {
    super(props);
    this.state = {
      socket: this.props.socket,
      user: this.props.user,
      users: this.props.users,
      groups: this.props.groups,
      selectedUser: {},
      selectedGroup: {
        name: "",
        image: "",
        members: [],
      },
      message: "",
      directMessage: true,
      group: false,
      friends: false,
      navigate: "chats",
      messages: [],
      newGroup: false,
    };
  }

  componentDidMount() {
    const socket = this.state.socket;
    socket.on("user connected", (user) => this.userConnected(user));
    socket.on("user disconnected", (user) => this.userDisconnected(user));
    socket.on("private message", (message) => this.privateMessage(message));
    socket.on("user messages", (messages) => this.userMessages(messages));

    socket.on("new group", (group) => this.newGroup(group));
    socket.on("group created", (group) => this.groupCreated(group));
    socket.on("group message", (groupMessage) =>
      this.groupMessage(groupMessage)
    );
    socket.on("group messages", (groupMessages) =>
      this.groupMessages(groupMessages)
    );
  }

  toggleNavigation = (name) => {
    if (name === "chats") {
      this.setState({
        directMessage: true,
        group: false,
        friends: false,
      });
    } else if (name === "groups") {
      this.setState({
        directMessage: false,
        group: true,
        friends: false,
      });
    } else {
      this.setState({
        directMessage: false,
        group: false,
        friends: true,
      });
    }
    this.setState({
      navigate: name,
      selectedUser: {},
      selectedGroup: {
        name: "",
        image: "",
        members: [],
      },
    });
  };

  selectUser = (selectedUser) => {
    this.setState({
      selectedUser,
      selectedGroup: {
        name: "",
        image: "",
        members: [],
      },
      newGroup: false,
      message: "",
      messages: [],
    });
    const socket = this.state.socket;
    socket.emit("user messages", selectedUser);
    this.handleNewMessageStatus(selectedUser.userId, false);
  };

  selectGroup = (selectedGroup) => {
    this.setState({
      selectedGroup,
      selectedUser: {},
      newGroup: false,
      message: "",
      messages: [],
    });
    const socket = this.state.socket;
    socket.emit("group messages", selectedGroup.groupId);
    this.handleNewGroupMessageStatus(selectedGroup.groupId, false);
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

  createGroup = (group) => {
    const socket = this.state.socket;
    socket.emit("new group", group);
  };

  render() {
    const {
      user,
      users,
      groups,
      selectedUser,
      selectedGroup,
      message,
      directMessage,
      group,
      friends,
      messages,
      newGroup,
    } = this.state;
    return (
      <ChatContainer>
        <Navigation
          user={user}
          toggleNavigation={this.toggleNavigation}
          directMessage={directMessage}
          group={group}
          friends={friends}
        />
        {directMessage && (
          <ChatWindow>
            <Users users={users} selectUser={this.selectUser} />
            <ChatEntity>
              {selectedUser.userId && (
                <React.Fragment>
                  <DirectMessageHeader user={selectedUser} />
                  <DirectMessageBody user={user} messages={messages} />
                  <DirectMessageInput
                    message={message}
                    setMessage={this.setMessage}
                    sendMessage={this.sendMessage}
                  />
                </React.Fragment>
              )}
            </ChatEntity>
          </ChatWindow>
        )}
        {group && (
          <ChatWindow>
            <Groups
              user={user}
              groups={groups}
              selectGroup={this.selectGroup}
            />
            <ChatEntity>
              {selectedGroup.groupId && (
                <React.Fragment>
                  <GroupHeader group={selectedGroup} user={user} />
                  <GroupBody user={user} messages={messages} />
                  <GroupInput
                    message={message}
                    setMessage={this.setMessage}
                    sendGroupMessage={this.sendGroupMessage}
                  />
                </React.Fragment>
              )}
            </ChatEntity>
          </ChatWindow>
        )}
        {friends && (
          <ChatWindow>
            <Friends />
            <ChatEntity friends={friends}>
              <FriendBody />
            </ChatEntity>
          </ChatWindow>
        )}
        <ChatEntity>
          {newGroup && (
            <NewGroup
              users={users}
              createGroup={this.createGroup}
              toggleNewGroup={this.toggleNewGroup}
            />
          )}
        </ChatEntity>
      </ChatContainer>
    );
  }
}

export default Chat;
