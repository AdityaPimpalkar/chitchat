import { Component } from "react";
import socket from "../www/socket";

class FindFriendsEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      friends: [],
      selectedFriend: {},
      isLoading: false,
      findFriends: false,
      friendRequests: true,
    };
  }
  componentDidMount() {
    socket.on("searchedFriend", (friend) => this.searchedFriend(friend));
  }

  setSearch = (value) => {
    this.setState({ search: value });
  };

  searchFriend = () => {
    const email = this.state.search;
    this.setState({ isLoading: true });
    socket.emit("searchFriend", email);
  };

  searchedFriend = (friend) => {
    if (friend) {
      this.setState({ friends: [{ ...friend }] });
    } else {
      this.setState({ friends: [] });
    }
    this.setState({ isLoading: false });
  };

  selectFriend = (friend) => {
    this.setState({ selectedFriend: friend });
  };

  toggleFindFriends = () => {
    this.setState({ findFriends: true, friendRequests: false });
  };

  toggleFriendRequests = () => {
    this.setState({ friendRequests: true, findFriends: false });
  };
  render() {
    return null;
  }
}

export default FindFriendsEvents;
