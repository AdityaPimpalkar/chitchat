import React from "react";

const ChatEntity = (props) => {
  return (
    <div className="chatwindow w-3/4">
      {props.children}
    </div>
  );
};

export default ChatEntity;
