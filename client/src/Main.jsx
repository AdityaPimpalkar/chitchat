import React, { Component } from "react";
import socket from "./www/socket";
import Login from "./screens/login/Login";
import Chat from "./components/Chat";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket,
      user: "",
      loggedInUser: {},
      users: [],
      groups: [],
    };
  }

  componentDidMount() {
    this.checkIfUserExists();

    const { socket } = this.state;

    socket.on("connect", () => {
      console.info("connected");
    });

    socket.on("disconnect", () => {
      console.info("Disconnected");
    });

    socket.on("session", ({ sessionId, userId, username }) => {
      socket.auth = { sessionId: sessionId };
      localStorage.setItem("sessionId", sessionId);
      const loggedInUser = { userId, username };
      this.setState({ loggedInUser });
    });

    socket.on("users", ({ users, groups }) => {
      this.setState({ users, groups });
    });
  }

  checkIfUserExists = () => {
    const { socket } = this.state;
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      socket.auth = { sessionId: sessionId };
      socket.connect();
    }
  };

  onLoginSuccess = (response) => {
    console.log(response);
    //const { socket, user } = this.state;
    // socket.auth = { username: user };
    // socket.connect();
  };

  onLoginFailure = () => {
    console.log("Login Failed!")
  };


  render() {
    const { socket, users, groups, loggedInUser } = this.state;
    return (
      <main className="d-flex justify-content-center align-items-center">
        <div className="col-xl-11 col-lg-11 col-11">
          <div className="row mt-3">
            {loggedInUser.userId && (
              <Chat
                socket={socket}
                user={loggedInUser}
                users={users}
                groups={groups}
              />
            )}
            {!loggedInUser.userId && (
              <Login
                onSuccess={this.onLoginSuccess}
                onFailure={this.onLoginFailure}
              />
            )}
          </div>
        </div>
      </main>
    );
  }
}

export default Main;
