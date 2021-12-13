import React from "react";

const ChatEntity = (props) => {
  return (
    <div
      className={
        props.hasSpacing ? "chatwindow w-3/4 pb-2" : "chatwindow w-3/4"
      }
    >
      {props.children}
    </div>
  );
};

export default ChatEntity;
