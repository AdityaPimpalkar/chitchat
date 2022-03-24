import React from "react";
import {
  AnnotationIcon,
  // UserGroupIcon,
  UserAddIcon,
  ZoomInIcon,
} from "@heroicons/react/outline";
import {
  navigatedToChats,
  // navigatedToGroups,
  navigatedToRequests,
  navigatedToSearch,
} from "../../store/navigation";

import { useSelector, useDispatch } from "react-redux";
import { entityCleared } from "../../store/entity";

const Navigation = () => {
  const navigation = useSelector((state) => state.navigation.currentTab);
  const newChatMessage = useSelector((state) => state.navigation.chatPing);
  // const newGroupMessage = useSelector((state) => state.navigation.groupPing);
  const newFriendRequest = useSelector((state) => state.navigation.requestPing);
  const dispatch = useDispatch();
  return (
    <div className="grid grid-cols-3 flex flex-row w-full postiton-relative bg-purple-800 py-2">
      <button
        onClick={() => {
          dispatch(entityCleared());
          dispatch(navigatedToChats());
        }}
      >
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
              <span className="flex absolute h-3 w-3 top-0 right-0 -mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            )}
          </div>
        </div>
      </button>
      {/* <button onClick={() => dispatch(navigatedToGroups())}>
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
              <span className="flex absolute h-3 w-3 top-0 right-0 -mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            )}
          </div>
        </div>
      </button> */}
      <button
        onClick={() => {
          dispatch(entityCleared());
          dispatch(navigatedToRequests());
        }}
      >
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
              <span className="flex absolute h-3 w-3 top-0 right-0 -mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            )}
          </div>
        </div>
      </button>
      <button
        onClick={() => {
          dispatch(entityCleared());
          dispatch(navigatedToSearch());
        }}
      >
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
