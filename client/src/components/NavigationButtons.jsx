import React from "react";
import {
  AnnotationIcon,
  UserGroupIcon,
  UserAddIcon,
} from "@heroicons/react/outline";

const NavigationButtons = ({
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
    <div className="grid grid-cols-3 flex flex-row w-full postiton-relative bg-purple-800 shadow-xl py-2">
      <button onClick={() => toggleChats()}>
        <div className="flex justify-center items-center">
          <div className="relative inline-block py-auto">
            <AnnotationIcon
              className={
                directMessage
                  ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-11 2xl:w-11"
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
                  ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-11 2xl:w-11"
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
            <UserAddIcon
              className={
                friends
                  ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-11 2xl:w-11"
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
  );
};

export default NavigationButtons;
