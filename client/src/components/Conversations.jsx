import React, { useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import ChatInput from "../components/ChatInput";
import DiretMessages from "../components/DirectMessages";
import socket from "../www/socket";

const Conversations = ({ selectedUser, loggedInUser, isConnected }) => {
  const [user, setUser] = useState(selectedUser);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("user messages", ({ messages, connected, lastSeen }) => {
      setUser({ ...user, connected, lastSeen });
      setMessages(messages);
    });
    return () => {
      socket.off("user messages");
    };
  }, [user]);

  const sendMessage = (value) => {
    const message = {
      content: value,
      to: user.userId,
    };
    socket.emit("private message", message);
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
