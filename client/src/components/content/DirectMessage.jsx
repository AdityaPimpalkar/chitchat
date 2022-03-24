import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../www/socket";
import SocketEvents from "../../events/constants";
import { messageSent } from "../../store/entities/conversations";
import { chatConnected, chatDisconnected } from "../../store/entity";

import ChatHeader from "../common/ChatHeader";
import Messages from "../common/Messages";
import ChatInput from "../common/ChatInput";

const DirectMessage = () => {
  const loggedInUser = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.entity.chat);
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(SocketEvents.USER_CONNECTED, (connected) => {
      if (user.userId === connected.userId) dispatch(chatConnected());
    });
    socket.on(SocketEvents.USER_DISCONNECTED, (disconnected) => {
      if (user.userId === disconnected.userId)
        dispatch(chatDisconnected(disconnected.lastSeen));
    });
    return () => {
      socket.off(SocketEvents.USER_CONNECTED);
      socket.off(SocketEvents.USER_DISCONNECTED);
    };
  }, [user, dispatch]);

  useEffect(() => {
    socket.on(
      SocketEvents.USER_MESSAGES,
      ({ connected, messages, lastSeen }) => {
        if (connected) dispatch(chatConnected());
        else dispatch(chatDisconnected(lastSeen));
        setMessages(messages);
      }
    );

    socket.on(SocketEvents.PRIVATE_MESSAGE, ({ content, from, to, sentOn }) => {
      console.log(from);
      const message = {
        content,
        from,
        to,
        sentOn,
      };
      if (user.userId === from) {
        setMessages([...messages, message]);
        dispatch(messageSent({ user, content: message }));
      }
    });

    return () => {
      socket.off(SocketEvents.USER_MESSAGES);
      socket.off(SocketEvents.PRIVATE_MESSAGE);
    };
  }, [user, messages, dispatch]);

  // useEffect(() => {
  //   setUser(selectedUser);
  // }, [selectedUser]);

  const sendMessage = (value) => {
    const messageArr = [...messages];
    const message = {
      content: value,
      to: user.userId,
      from: loggedInUser.userId,
      sentOn: new Date().toString(),
    };
    setMessages([...messages, message]);
    socket.emit(SocketEvents.PRIVATE_MESSAGE, message, ({ result, error }) => {
      if (result) {
        dispatch(messageSent({ user, content: message }));
      }
      if (error) setMessages([...messageArr]);
    });
  };
  return (
    <React.Fragment>
      <ChatHeader user={user} />
      <Messages messages={messages} user={loggedInUser} />
      <ChatInput sendMessage={(value) => sendMessage(value)} />
    </React.Fragment>
  );
};

export default DirectMessage;
