import React from "react";
import {
  AnnotationIcon,
  // UserGroupIcon,
  UserAddIcon,
  ZoomInIcon,
} from "@heroicons/react/outline";

const Navigation = ({
  navigation,
  toggleNavigation,
  newChatMessage,
  // newGroupMessage,
  newFriendRequest,
}) => {
  return (
    <div className="grid grid-cols-3 flex flex-row w-full postiton-relative bg-purple-800 py-2">
      <button onClick={() => toggleNavigation("CHATS")}>
        <div className="flex justify-center items-center">
          <div className="relative inline-block py-auto">
            <AnnotationIcon
              className={
                navigation === "CHATS"
                  ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-11 2xl:w-11"
                  : "lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
              }
            />
            {newChatMessage && (
              <span class="flex absolute h-3 w-3 top-0 right-0 -mr-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            )}
          </div>
        </div>
      </button>
      {/* <button onClick={() => toggleNavigation("GROUPS")}>
        <div className="flex justify-center items-center">
          <div className="relative inline-block py-auto">
            <UserGroupIcon
              className={
                navigation === "GROUPS"
                  ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-11 2xl:w-11"
                  : "lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
              }
            />
            {newGroupMessage && (
              <span class="flex absolute h-3 w-3 top-0 right-0 -mr-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            )}
          </div>
        </div>
      </button> */}
      <button onClick={() => toggleNavigation("REQUESTS")}>
        <div className="flex justify-center items-center">
          <div className="relative inline-block py-auto">
            <UserAddIcon
              className={
                navigation === "REQUESTS"
                  ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-11 2xl:w-11"
                  : "lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
              }
            />
            {newFriendRequest && (
              <span class="flex absolute h-3 w-3 top-0 right-0 -mr-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            )}
          </div>
        </div>
      </button>
      <button onClick={() => toggleNavigation("SEARCH")}>
        <div className="flex justify-center items-center">
          <div className="relative inline-block py-auto">
            <ZoomInIcon
              className={
                navigation === "SEARCH"
                  ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-11 2xl:w-11"
                  : "lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
              }
            />
          </div>
        </div>
      </button>
    </div>
  );
};

export default Navigation;
