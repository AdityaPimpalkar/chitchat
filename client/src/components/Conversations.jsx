import React, { useEffect, useState, useCallback } from "react";
import SocketEvents from "../events/constants";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import DiretMessages from "../components/DirectMessages";
import socket from "../www/socket";

const Conversations = ({ selectedUser, loggedInUser, isConnected }) => {
  const [user, setUser] = useState(selectedUser);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on(
      SocketEvents.USER_MESSAGES,
      ({ userId, username, connected, messages, lastSeen }) => {
        setUser({ ...user, userId, username, connected, lastSeen });
        setMessages(messages);
      }
    );
    return () => {
      socket.off(SocketEvents.USER_MESSAGES);
    };
  }, [user]);

  useEffect(() => {
    setUser(selectedUser);
  }, [selectedUser]);

  const sendMessage = (value) => {
    const message = {
      content: value,
      to: user.userId,
    };
    socket.emit(SocketEvents.PRIVATE_MESSAGE, message);
    setMessages([...messages, message]);
    //TODO - update users last message and message status to true
    //this.newDirectMessage(selectedUser.userId, false, message);
  };
  return (
    <React.Fragment>
      <ChatHeader user={user} />
      <DiretMessages user={loggedInUser} messages={messages} />
      <ChatInput
        sendMessage={(value) => sendMessage(value)}
        isConnected={isConnected}
      />
    </React.Fragment>
  );
};

export default Conversations;
