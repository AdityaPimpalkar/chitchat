import React from "react";

const ChatEntity = (props) => {
  console.log(props.friends);
  return (
    <div
      className={props.friends ? "chatwindow w-3/4 pb-2" : "chatwindow w-3/4"}
    >
      {props.children}
    </div>
  );
};

export default ChatEntity;
