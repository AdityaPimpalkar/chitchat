import React, { Component } from "react";
import socket from "./www/socket";
import Login from "./screens/Login";
import Chat from "./screens/Chat";
import Chats from "./screens/Chats";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket,
      user: "",
      loggedInUser: {},
      users: [],
      groups: [],
      friendRequests: [],
      isLoading: true,
      LoadWidth: "w-32",
      isConnected: false,
    };
  }

  componentDidMount() {
    this.checkIfUserExists();

    const { socket } = this.state;

    socket.on("connect", () => {
      this.setState({ isConnected: true });
    });

    socket.on("disconnect", () => {
      this.setState({ isConnected: false });
    });

    socket.on("session", ({ token, userId, username, image }) => {
      socket.auth = { token };
      localStorage.setItem("token", token);
      const loggedInUser = { userId, username, image };
      this.setState({ loggedInUser, LoadWidth: "w-96", isLoading: false });
    });

    socket.on("users", ({ users, groups, friendRequests }) => {
      this.setState({ users, groups, friendRequests, LoadWidth: "w-64" });
    });
  }

  checkIfUserExists = () => {
    const { socket } = this.state;
    const token = localStorage.getItem("token");
    if (token) {
      socket.auth = { token };
      socket.connect();
    } else {
      this.setState({ LoadWidth: "w-96", isLoading: false });
    }
  };

  onLoginSuccess = (response) => {
    const { profileObj, tokenId } = response;
    const { socket } = this.state;
    socket.auth = { user: profileObj, tokenId };
    socket.connect();
  };

  onLoginFailure = () => {
    console.log("Login Failed!");
  };

  render() {
    const {
      users,
      groups,
      friendRequests,
      loggedInUser,
      isLoading,
      LoadWidth,
      isConnected,
    } = this.state;
    return (
      <main>
        {loggedInUser.userId && (
          <Chats
            user={loggedInUser}
            users={users}
            groups={groups}
            friendRequests={friendRequests}
            isConnected={isConnected}
          />
        )}
        {!loggedInUser.userId && (
          <Login
            onSuccess={this.onLoginSuccess}
            onFailure={this.onLoginFailure}
            isLoading={isLoading}
            LoadWidth={LoadWidth}
          />
        )}
      </main>
    );
  }
}

export default Main;
