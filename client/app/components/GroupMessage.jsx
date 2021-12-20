import React from "react";
import socket from "../www/socket";
import GroupMessageEvents from "./GroupMessageEvents";
import NewGroup from "./NewGroup";
import ChatEntity from "../layouts/ChatEntity";
import ChatWindow from "../layouts/ChatWindow";
import Groups from "../screens/group/Groups";
import Header from "../screens/group/Header";
import Input from "../screens/group/Input";
import Body from "../screens/group/Body";

class GroupMessage extends GroupMessageEvents {
  constructor(props) {
    super(props);
    this.state = {
      socket,
      user: this.props.user,
      users: this.props.users,
      groups: this.props.groups,
      selectedGroup: {},
      message: "",
      messages: [],
      newGroup: false,
    };
  }

  componentDidMount() {
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
    const { user, users, groups, selectedGroup, message, messages, newGroup } =
      this.state;
    return (
      <ChatWindow>
        <Groups
          user={user}
          groups={groups}
          selectGroup={this.selectGroup}
          toggleNewGroup={this.toggleNewGroup}
        />
        <ChatEntity>
          {selectedGroup.groupId && (
            <React.Fragment>
              <Header group={selectedGroup} user={user} />
              <Body user={user} messages={messages} />
              <Input
                message={message}
                setMessage={this.setMessage}
                sendGroupMessage={this.sendGroupMessage}
              />
            </React.Fragment>
          )}

          {newGroup && (
            <React.Fragment>
              <NewGroup
                users={users}
                createGroup={this.createGroup}
                toggleNewGroup={this.toggleNewGroup}
              />
            </React.Fragment>
          )}
        </ChatEntity>
      </ChatWindow>
    );
  }
}

export default GroupMessage;
