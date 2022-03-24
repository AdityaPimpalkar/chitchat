import React from "react";
import { ChatAlt2Icon, ExclamationIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
const Navigation = () => {
  const user = useSelector((state) => state.auth.user);
  const isConnected = useSelector((state) => state.auth.connected);
  return (
    <div className="grid grid-cols-2 flex flex-row w-full bg-purple-900 shadow-xl  lg:h-12 xl:h-16 2xl:h-20">
      <div className="flex flex-row items-center">
        <ChatAlt2Icon className="text-white lg:h-8 lg:w-8 mx-2 xl:h-9 xl:w-9 2xl:h-12 w-12" />
        <span className="text-white lg:text-sm xl:text-lg 2xl:text-xl bg-purple-900">
          chitchat.io
        </span>
      </div>
      <div className="flex flex-row-reverse items-center">
        <img
          src={user.image}
          className="rounded-full border-2 border-yellow-500 mx-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
          alt="user"
        />
        <span className="lg:text-sm xl:text-base 2xl:text-lg">
          {isConnected === false && (
            <span className="text-red-600">Disconnected</span>
          )}
        </span>
        {isConnected === false && (
          <ExclamationIcon className="text-red-600 lg:h-5 lg:w-5 xl:h-6 xl:w-6 2xl:h-7 w-7" />
        )}
      </div>
    </div>
  );
};

export default Navigation;
