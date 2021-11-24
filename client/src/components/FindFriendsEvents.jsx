import { Component } from "react";

class FindFriendsEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: [],
      selectedFriend: {},
    };
  }
  selectFriend = (friend) => {
    this.setState({ selectedFriend: friend });
  };
  render() {
    return null;
  }
}

export default FindFriendsEvents;
