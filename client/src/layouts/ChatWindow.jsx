import React from "react";

const ChatWindow = (props) => {
  return (
    <div className="d-flex flex-column col-6 col-lg-6 col-xl-6 ps-0 pe-0 chat-window">
      {props.children}
    </div>
  );
};

export default ChatWindow;
