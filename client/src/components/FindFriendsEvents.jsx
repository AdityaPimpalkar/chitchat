import { Component } from "react";
import socket from "../www/socket";

class FindFriendsEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      friends: [],
      requests: [],
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

  openChat = (friend) => {
    this.props.openChat(friend);
  };

  addFriend = () => {
    const { selectedFriend, friends } = this.state;
    friends.map((friend) =>
      friend.userId === selectedFriend.userId
        ? (friend.sentRequest = true)
        : null
    );
    this.setState({ friends });
    socket.emit("addFriend", selectedFriend);
  };

  acceptRequest = (friend) => {
    let { requests } = this.state;
    requests = requests.filter((request) => request.userId !== friend.userId);
    socket.emit("acceptRequest", friend);
    this.setState({ requests });
    this.props.updateRequests(requests);
  };

  toggleFindFriends = () => {
    this.setState({
      findFriends: true,
      friendRequests: false,
      selectedFriend: {},
    });
  };

  toggleFriendRequests = () => {
    this.setState({
      friendRequests: true,
      findFriends: false,
      selectedFriend: {},
    });
  };
  render() {
    return null;
  }
}

export default FindFriendsEvents;
