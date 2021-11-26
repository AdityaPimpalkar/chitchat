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
    }
    this.setState({ isLoading: false });
  };

  selectFriend = (friend) => {
    this.setState({ selectedFriend: friend });
  };
  render() {
    return null;
  }
}

export default FindFriendsEvents;
