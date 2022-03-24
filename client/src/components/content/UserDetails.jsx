import React from "react";
import {
  CheckIcon,
  ClockIcon,
  PlusIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../www/socket";
import SocketEvents from "../../events/constants";
import { navigatedToChats } from "../../store/navigation";
import {
  actionStarted,
  actionEnded,
  userSelected,
  chatSelected,
  entityCleared,
} from "../../store/entity";
import { requestAccepted } from "../../store/entities/requests";
import { messageSeen } from "../../store/entities/conversations";
import { addedAsFriend } from "../../store/entities/search";
import SpinnerIcon from "../common/SpinnerIcon";

const UserDetails = () => {
  const user = useSelector((state) => state.entity.user);
  const isLoading = useSelector((state) => state.entity.actionLoading);
  const navigation = useSelector((state) => state.navigation.currentTab);

  const searchFriends = navigation === "SEARCH";
  const dispatch = useDispatch();

  const openChat = (user) => {
    dispatch(entityCleared());
    dispatch(navigatedToChats());
    dispatch(chatSelected(user));
    socket.emit(SocketEvents.USER_MESSAGES, user);
    dispatch(messageSeen(user.userId));
  };

  const acceptRequest = (friend) => {
    dispatch(actionStarted());
    socket.emit(SocketEvents.ACCEPT_REQUEST, friend, ({ result, error }) => {
      if (result) {
        dispatch(requestAccepted(friend));
        dispatch(entityCleared());
      }
      if (error) {
        console.log(error);
      }
      dispatch(actionEnded());
    });
  };

  const addFriend = (friend) => {
    dispatch(actionStarted());
    socket.emit(SocketEvents.ADD_FRIEND, friend, ({ result, error }) => {
      if (result) {
        const updateFriend = { ...friend };
        updateFriend.sentRequest = true;
        updateFriend.isAdded = false;
        dispatch(userSelected(updateFriend));
        dispatch(addedAsFriend());
        dispatch(actionEnded());
      }
      if (error) {
        console.log(error);
      }
      dispatch(actionEnded());
    });
  };

  return (
    <div className="h-full bg-purple-700 text-left">
      <div className="w-full h-full text-center flex flex-col justify-center items-center">
        <img
          src={user.image}
          className="rounded-full mt-5 mb-2 mx-auto border-2 lg:h-36 lg:w-36 xl:h-48 xl:w-48 2xl:h-64 2xl:w-64"
          alt="img"
        />
        <div className="flex flex-row justify-center items-center">
          <span className="my-auto truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-2xl 2xl:font-semibold">
            {user.username}
          </span>

          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-400 ml-1 lg:h-3 lg:w-3 xl:h-6 xl:w-6 2xl:h-8 2xl:w-8"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <span className="italic mb-1 truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-xl 2xl:font-semibold">
          {user.email}
        </span>
        <span className="italic mb-3 text-green-300 truncate lg:text-xs 2xl:text-lg">
          Verified
        </span>
        {user.sentRequest === false && user.isAdded === true && (
          <button
            className="border-2 pr-2 rounded-lg flex flex-fill justify-center items-center text-semibold hover:bg-yellow-500 hover:shadow-xl"
            onClick={() => openChat(user)}
          >
            <AnnotationIcon className="mr-2 lg:h-6 lg:w-6 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 m-2" />
            Open Chat
          </button>
        )}
        {user.sentRequest === true &&
          user.isAdded === false &&
          searchFriends === true && (
            <div className="flex flex-row justify-center items-center bg-yellow-600 rounded-full">
              <ClockIcon className="lg:h-6 lg:w-6 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 m-2" />
              <span className="mr-2">Waiting for approval</span>
            </div>
          )}

        {user.hasRequested === true && searchFriends === true && (
          <div className="flex flex-row justify-center items-center text-black bg-white rounded-full">
            <ClockIcon className="lg:h-6 lg:w-6 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 m-2" />
            <span className="mr-2">Please check your friend requests</span>
          </div>
        )}

        {user.hasRequested === true && searchFriends === false && (
          <button
            className="border-2 pr-2 rounded-lg flex flex-fill justify-center items-center text-semibold hover:bg-yellow-500 hover:shadow-xl"
            onClick={() => acceptRequest(user)}
          >
            {isLoading ? (
              <SpinnerIcon className="lg:h-6 lg:w-6 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 m-2" />
            ) : (
              <CheckIcon className="lg:h-6 lg:w-6 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 m-2" />
            )}
            Accept request
          </button>
        )}
        {user.sentRequest === false && user.isAdded === false && (
          <button
            className="border-2 pr-2 rounded-lg flex flex-fill justify-center items-center text-semibold hover:bg-yellow-500 hover:shadow-xl"
            onClick={() => addFriend(user)}
          >
            {isLoading ? (
              <SpinnerIcon className="lg:h-6 lg:w-6 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 m-2" />
            ) : (
              <PlusIcon className="lg:h-6 lg:w-6 xl:h-8 xl:w-8 2xl:h-9 2xl:w-9 m-2" />
            )}
            Add as friend
          </button>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
