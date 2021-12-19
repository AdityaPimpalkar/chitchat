import React from "react";

import { ChatAlt2Icon } from "@heroicons/react/solid";

const Navigation = ({ user }) => {
  return (
    <div className="grid grid-cols-3 w-full bg-purple-900 shadow-xl fixed top-0">
      <div className="flex flex-row items-center ">
        <ChatAlt2Icon className="lg:h-6 w-6 mx-2 xl:h-8 w-8 2xl:h-12 w-12" />
        <span className="lg:text-base font-medium xl:text-lg 2xl:text-xl bg-purple-900">
          chitchat.io
        </span>
      </div>
      <div className="flex flex-row justify-center items-center"></div>
      <div className="flex flex-row-reverse items-center">
        <img src={user.image} className="hidden" alt="user" />
        <img
          src={user.image}
          className="rounded-full border-2 border-yellow-500 mx-2 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-12 2xl:w-12"
          alt="user"
        />
        <span className="lg:text-sm xl:text-base 2xl:text-lg">
          {user.username}
        </span>
      </div>
    </div>
  );
};

export default Navigation;
