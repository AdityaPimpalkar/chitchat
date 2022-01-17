import { Component } from "react";
import socket from "../www/socket";
class ChatEvents extends Component {
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

  toggleChats = () => {
    this.setState({
      directMessage: true,
      selectedUser: {},
      selectedGroup: {},
      directMessageNotification: false,
      group: false,
      friends: false,
      searchFriends: false,
    });
  };

  toggleGroups = () => {
    this.setState({
      directMessage: false,
      selectedUser: {},
      selectedGroup: {},
      group: true,
      groupNotification: false,
      friends: false,
      searchFriends: false,
    });
  };

  toggleFriends = () => {
    this.setState({
      directMessage: false,
      selectedUser: {},
      selectedGroup: {},
      group: false,
      friends: true,
      friendsNotification: false,
      searchFriends: false,
    });
  };

  toggleSearchFriends = () => {
    this.setState({
      directMessage: false,
      selectedUser: {},
      selectedGroup: {},
      group: false,
      friends: false,
      searchFriends: true,
    });
  };

  setSearch = (text) => {
    this.setState({ search: text });
  };

  onSearch = () => {
    const search = this.state.search;
    const directMessage = this.state.directMessage;
    const group = this.state.group;
    const friends = this.state.friends;

    if (directMessage) {
    } else if (group) {
    } else if (friends) {
    } else {
      socket.emit("searchFriend", search);
    }
  };

  searchedFriend = (friend) => {
    if (friend) {
      this.setState({ searchedFriends: [{ ...friend }] });
    } else {
      this.setState({ searchedFriends: [] });
    }
    this.setState({ isLoading: false });
  };

  userConnected = ({ userId, username }) => {
    const user = { ...this.state.user };
    const selectedUser = { ...this.state.selectedUser };
    if (selectedUser.userId === userId) {
      selectedUser.connected = true;
      this.setState({ selectedUser });
    }
    if (user.userId !== userId) {
      const users = [...this.state.users];
      const user = users.find((user) => user.userId === userId);
      if (user) {
        this.handleConnectionStatus(user.userId, true);
      }
    }
  };

  userDisconnected = ({ userId, lastSeen }) => {
    const selectedUser = { ...this.state.selectedUser };
    if (selectedUser.userId === userId) {
      selectedUser.connected = false;
      selectedUser.lastSeen = lastSeen;
      this.setState({ selectedUser });
    }
    this.handleConnectionStatus(userId, false);
  };

  handleConnectionStatus = (userId, status) => {
    const users = [...this.state.users];
    const userIndex = users.findIndex((u) => u.userId === userId);
    if (userIndex >= 0) {
      users[userIndex].connected = status;
      this.setState({ users });
    }
  };

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

  userMessages = ({ userId, messages, connected, lastSeen }) => {
    const selectedUser = { ...this.state.selectedUser };
    if (selectedUser.userId === userId) {
      selectedUser.connected = connected;
      selectedUser.lastSeen = lastSeen;
      this.setState({ selectedUser });
    }
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
      this.newDirectMessage(from, false, content);
    } else {
      this.newDirectMessage(from, true, content);
    }

    const directMessage = this.state.directMessage;
    if (directMessage === false) {
      this.setState({ directMessageNotification: true });
    }
  };

  newDirectMessage = (userId, status, content) => {
    const users = [...this.state.users];
    const userIndex = users.findIndex((u) => u.userId === userId);
    if (userIndex >= 0) {
      users[userIndex].hasNewMessage = status;
      if (content) {
        users[userIndex].lastMessage = { content };
      }
      this.setState({ users });
    }
  };

  setMessage = (message) => {
    this.setState({ message });
  };

  sendDirectMessage = () => {
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
    this.newDirectMessage(selectedUser.userId, false, message);
    this.setState({ messages: [...messages, newMessage], message: "" });
  };

  sendMessage = () => {
    const directMessage = this.state.directMessage;
    const group = this.state.group;

    if (directMessage) {
      this.sendDirectMessage();
    } else if (group) {
      this.sendGroupMessage();
    }
  };

  toggleNewGroup = (status) => {
    this.setState({
      newGroup: status,
      selectedGroup: {},
      message: "",
      messages: [],
    });
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

  groupMessage = ({ groupId, message }) => {
    const selectedGroup = { ...this.state.selectedGroup };
    if (selectedGroup.groupId === groupId) {
      const messages = [...this.state.messages];
      this.setState({ messages: [...messages, message] });
    } else {
      this.handleNewGroupMessageStatus(groupId, true);
    }
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

  handleNewGroupMessageStatus = (groupId, status) => {
    const groups = [...this.state.groups];
    const groupIndex = groups.findIndex((u) => u.groupId === groupId);
    if (groupIndex >= 0) {
      groups[groupIndex].hasNewMessage = status;
      this.setState({ groups });
    }
  };

  openChat = (friend) => {
    this.toggleChats();
    this.setState({ search: "", searchedFriends: [], userDetail: {} });
    this.selectUser(friend);
  };

  moreUserDetails = (user) => {
    console.log("clicked", user);
    this.setState({ userDetail: user });
  };

  acceptRequest = (friend) => {
    let { friendRequests } = this.state;
    friendRequests = friendRequests.filter(
      (request) => request.userId !== friend.userId
    );
    socket.emit("acceptRequest", friend);
    this.setState({ friendRequests });
  };

  newRequest = (friend) => {
    const { friendRequests } = this.state;
    this.setState({ friendRequests: [friend, ...friendRequests] });
  };

  addFriend = () => {
    const selectedFriend = { ...this.state.selectedFriend };
    const searchedFriends = [...this.state.searchedFriends];
    searchedFriends.map((friend) =>
      friend.userId === selectedFriend.userId
        ? (friend.sentRequest = true)
        : null
    );
    selectedFriend.sentRequest = true;
    selectedFriend.isAdded = false;
    this.setState({ searchedFriends, selectedFriend });
    socket.emit("addFriend", selectedFriend);
  };

  newFriend = (friend) => {
    let { users } = this.state;
    this.setState({ users: [friend, ...users] });
  };

  render() {
    return null;
  }
}

export default ChatEvents;
