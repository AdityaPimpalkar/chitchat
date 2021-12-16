import React from "react";
import {
  AnnotationIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/outline";

import { ChatAlt2Icon } from "@heroicons/react/solid";

const Navigation = ({
  user,
  toggleChats,
  toggleGroups,
  toggleFriends,
  directMessage,
  directMessageNotification,
  group,
  groupNotification,
  friends,
  friendsNotification,
}) => {
  return (
    <div className="grid grid-cols-3 w-full bg-purple-900 shadow-xl">
      <div className="flex flex-row items-center">
        <ChatAlt2Icon className="lg:h-6 w-6 mx-2 xl:h-8 w-8 2xl:h-12 w-12" />
        <span className="lg:text-base font-medium xl:text-lg 2xl:text-xl">
          chitchat.io
        </span>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="grid grid-cols-3 w-full">
          <button onClick={() => toggleChats()}>
            <div className="flex justify-center items-center">
              <div className="relative inline-block py-auto">
                <AnnotationIcon
                  className={
                    directMessage
                      ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
                      : "lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
                  }
                />
                {directMessageNotification && (
                  <span class="flex absolute h-3 w-3 top-0 right-0 -mr-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                  </span>
                )}
              </div>
            </div>
          </button>
          <button onClick={() => toggleGroups()}>
            <div className="flex justify-center items-center">
              <div className="relative inline-block py-auto">
                <UserGroupIcon
                  className={
                    group
                      ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
                      : "lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
                  }
                />
                {groupNotification && (
                  <span class="flex absolute h-3 w-3 top-0 right-0 -mr-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                  </span>
                )}
              </div>
            </div>
          </button>
          <button onClick={() => toggleFriends()}>
            <div className="flex justify-center items-center">
              <div className="relative inline-block py-auto">
                <UsersIcon
                  className={
                    friends
                      ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
                      : "lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
                  }
                />
                {friendsNotification && (
                  <span class="flex absolute h-3 w-3 top-0 right-0 -mr-2">
                    <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                  </span>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>
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
