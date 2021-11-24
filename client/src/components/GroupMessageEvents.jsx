import { Component } from "react";
import socket from "./../www/socket";

class GroupMessageEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket,
      user: this.props.user,
      groups: this.props.groups,
      selectedGroup: {},
      message: "",
      messages: [],
      newGroup: false,
    };
  }

  toggleNewGroup = (status) => {
    this.setState({
      newGroup: status,
      selectedGroup: {},
      message: "",
      messages: [],
    });
  };

  setMessage = (message) => {
    this.setState({ message });
  };

  selectGroup = (selectedGroup) => {
    this.setState({
      selectedGroup,
      newGroup: false,
      message: "",
      messages: [],
    });
    const socket = this.state.socket;
    socket.emit("group messages", selectedGroup.groupId);
    this.handleNewGroupMessageStatus(selectedGroup.groupId, false);
  };

  newGroup = (group) => {
    const groups = [...this.state.groups];
    groups.push(group);
    this.setState({ groups });
    const { groupId } = group;
    this.handleNewGroupMessageStatus(groupId, true);
  };

  createGroup = (group) => {
    const socket = this.state.socket;
    socket.emit("new group", group);
  };

  groupCreated = (group) => {
    const groups = [...this.state.groups];
    groups.push(group);
    this.setState({ selectedGroup: group, groups, newGroup: false });
  };

  groupMessage = ({ groupId, message }) => {
    const selectedGroup = { ...this.state.selectedGroup };
    if (selectedGroup.groupId === groupId) {
      const messages = [...this.state.messages];
      this.setState({ messages: [...messages, message] });
    } else {
      this.handleNewGroupMessageStatus(groupId, true);
    }
  };

  groupMessages = (messages) => {
    this.setState({ messages });
  };

  sendGroupMessage = () => {
    const socket = this.state.socket;
    const group = { ...this.state.selectedGroup };
    const message = this.state.message;
    const user = { ...this.state.user };
    const messages = [...this.state.messages];

    const newMessage = {
      from: user.userId,
      username: user.username,
      message,
    };

    this.setState({ messages: [...messages, newMessage], message: "" });

    socket.emit("group message", {
      groupId: group.groupId,
      message: newMessage,
    });
  };

  handleNewGroupMessageStatus = (groupId, status) => {
    const groups = [...this.state.groups];
    const groupIndex = groups.findIndex((u) => u.groupId === groupId);
    if (groupIndex >= 0) {
      groups[groupIndex].hasNewMessage = status;
      this.setState({ groups });
    }
  };

  render() {
    return null;
  }
}

export default GroupMessageEvents;
