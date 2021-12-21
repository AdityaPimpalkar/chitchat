import React from "react";

const ChatContainer = (props) => {
  return (
    <main class="flex flex-col h-screen hidden md:hidden lg:flex xl:flex 2x:flex">
      <div class="flex flex-1 text-white overflow-hidden">{props.children}</div>
    </main>
  );
};

export default ChatContainer;
