import React from "react";

const ChatContainer = (props) => {
  return (
    <div className="App text-white">
      <div className="hidden md:hidden lg:block xl:block">
        {props.children}
      </div>
    </div>
  );
};

export default ChatContainer;
