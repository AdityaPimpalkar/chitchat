import React from "react";

const ChatWindow = (props) => {
  return (
    <div className="flex flex-row">
      {props.children}
    </div>
  );
};

export default ChatWindow;
