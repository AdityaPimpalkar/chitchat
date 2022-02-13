import React, { useEffect, useState } from "react";
import SocketEvents from "../events/constants";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import DiretMessages from "../components/DirectMessages";
import socket from "../www/socket";

const Conversations = ({
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
        newDirectMessage(selectedUser.userId, false, newMessage);
      }
    });

    return () => {
      socket.off(SocketEvents.PRIVATE_MESSAGE);
    };
  }, [user, messages]);

  useEffect(() => {
    setUser(selectedUser);
  }, [selectedUser]);

  const sendMessage = (value) => {
    const message = {
      content: value,
      to: user.userId,
      from: loggedInUser.userId,
      sentOn: new Date(),
    };
    socket.emit(SocketEvents.PRIVATE_MESSAGE, message);
    setMessages([...messages, message]);
    newDirectMessage(selectedUser.userId, false, message);
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
