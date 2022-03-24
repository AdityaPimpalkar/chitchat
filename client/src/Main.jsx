import React, { useEffect, useState } from "react";
import socket from "./www/socket";
import Login from "./screens/Login";
import Chats from "./screens/Chats";
import SocketEvents from "./events/constants";
import { useSelector, useDispatch } from "react-redux";
import { userLoggedIn, userConnected, userDisConnected } from "./store/auth";
import { chatsLoaded, loadChats } from "./store/entities/conversations";
import { requestsLoaded } from "./store/entities/requests";

const Main = () => {
  const loggedInUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [loadWidth, setLoadWidth] = useState("w-32");

  const userExists = () => {
    const token = localStorage.getItem("token");
    if (token) {
      socket.auth = { token };
      socket.connect();
      setLoadWidth("w-96");
    } else {
      setLoadWidth("w-96");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    userExists();

    socket.on(SocketEvents.CONNECT, () => dispatch(userConnected()));

    socket.on(SocketEvents.DISCONNECT, () => dispatch(userDisConnected()));

    socket.on(SocketEvents.CONNECT_ERROR, dispatch(userDisConnected()));

    socket.on(SocketEvents.SERVER_ERROR, (err) => {
      console.log(err);
    });

    socket.on(SocketEvents.SESSION, ({ token, userId, username, image }) => {
      socket.auth = { token };
      localStorage.setItem("token", token);
      setLoadWidth("w-96");
      setIsLoading(false);
      dispatch(userLoggedIn({ user: { userId, username, image } }));
    });

    socket.on(SocketEvents.LOAD_DATA, ({ users, groups, friendRequests }) => {
      dispatch(loadChats(users));
      dispatch(chatsLoaded(users));
      //setGroups(groups);
      dispatch(requestsLoaded(friendRequests));
      setLoadWidth("w-64");
    });

    return () => {
      socket.off(SocketEvents.CONNECT);
      socket.off(SocketEvents.DISCONNECT);
      socket.off(SocketEvents.CONNECT_ERROR);
      socket.off(SocketEvents.SERVER_ERROR);
      socket.off(SocketEvents.SESSION);
      socket.off(SocketEvents.LOAD_DATA);
    };
  }, [dispatch]);

  const onLoginSuccess = (response) => {
    const { profileObj, tokenId } = response;
    socket.auth = { user: profileObj, tokenId };
    socket.connect();
  };

  const onLoginFailure = (err) => {
    console.log("Login Failed!", err);
  };

  return (
    <main>
      {loggedInUser.userId && <Chats />}
      {!loggedInUser.userId && (
        <Login
          onSuccess={(response) => onLoginSuccess(response)}
          onFailure={(err) => onLoginFailure(err)}
          isLoading={isLoading}
          LoadWidth={loadWidth}
        />
      )}
    </main>
  );
};

export default Main;
