import React, { useEffect, useState } from "react";
import SocketEvents from "../events/constants";
import ChatHeader from "./ChatHeader";
import Messages from "../components/common/Messages";
import ChatInput from "./common/ChatInput";
import socket from "../www/socket";

const DirectMessage = ({
  selectedUser,
  loggedInUser,
  newDirectMessage,
  isConnected,
}) => {
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
    socket.on(SocketEvents.PRIVATE_MESSAGE, ({ content, from, to, sentOn }) => {
      const newMessage = {
        content,
        from,
        to,
        sentOn,
      };
      if (user.userId === from) {
        setMessages([...messages, newMessage]);
        newDirectMessage(user.userId, false, newMessage);
      }
    });

    return () => {
      socket.off(SocketEvents.PRIVATE_MESSAGE);
    };
  }, [user, messages, newDirectMessage]);

  useEffect(() => {
    setUser(selectedUser);
  }, [selectedUser]);

  const sendMessage = (value) => {
    const messageArr = [...messages];
    const message = {
      content: value,
      to: user.userId,
      from: loggedInUser.userId,
      sentOn: new Date(),
    };
    socket.emit(SocketEvents.PRIVATE_MESSAGE, message, ({ result, error }) => {
      if (result) {
        setMessages([...messages, message]);
        newDirectMessage(user.userId, false, message);
      }
      if (error) setMessages([...messageArr]);
    });
  };
  return (
    <React.Fragment>
      <ChatHeader user={user} />
      <Messages messages={messages} user={loggedInUser} />
      <ChatInput
        sendMessage={(value) => sendMessage(value)}
        isConnected={isConnected}
      />
    </React.Fragment>
  );
};

export default DirectMessage;
