import React from "react";

const ChatHeader = ({ user }) => {
  return (
    <div className="flex flex-row text-left w-full py-3 bg-purple-900 lg:h-12 xl:h-16 2xl:h-20">
      <img
        className="border-2 rounded-full mx-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
        src={user.image}
        alt="user"
      />
      <div className="flex flex-col">
        <div className="lg:text-sm xl:text-base xl:font-semibold 2xl:text-lg 2xl:font-semibold">
          {user.username}
        </div>
        <div className="w-full flex flex-row items-center lg:mt-auto xl:mt-0">
          <span
            className={
              user.connected
                ? "lg:h-2 lg:w-2 rounded-full bg-green-400 lg:mr-1 2xl:h-3 2xl:w-3"
                : "lg:h-2 lg:w-2 rounded-full bg-red-700 lg:mr-1 2xl:h-3 2xl:w-3"
            }
          ></span>
          <span className="italic lg:text-xs xl:text-sm 2xl:text-base">
            {user.connected ? "online" : "offline"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
