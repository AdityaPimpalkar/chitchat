import React, { useState } from "react";
import {
  BadgeCheckIcon,
  ClockIcon,
  PlusIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";
import { useSelector, useDispatch } from "react-redux";
import socket from "../../www/socket";
import SocketEvents from "../../events/constants";
import { navigatedToChats } from "../../store/navigation";
import { messageSeen } from "../../store/entities/conversations";
import {
  userSelected,
  actionStarted,
  actionEnded,
  chatSelected,
} from "../../store/entity";
import { searchedFriend, addedAsFriend } from "../../store/entities/search";

import Entity from "../common/Entity";
import Search from "../common/Search";
import SpinnerIcon from "../common/SpinnerIcon";

const SearchFriends = () => {
  const actionLoading = useSelector((state) => state.entity.actionLoading);
  const user = useSelector((state) => state.entity.user);
  const searchedUsers = useSelector((state) => state.entities.search);
  const dispatch = useDispatch();
  const [searchResults, setsearchResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSearch = (value) => {
    setIsLoading(true);
    setsearchResults(true);
    socket.emit(
      SocketEvents.SEARCH_FRIEND,
      value,
      ({ result, error, data }) => {
        setIsLoading(false);
        if (result) {
          dispatch(searchedFriend(data));
        }
        if (error) console.log(error);
      }
    );
  };

  const isClear = () => {
    setsearchResults(false);
    dispatch(searchedFriend({}));
  };

  const openChat = (user) => {
    dispatch(navigatedToChats());
    dispatch(chatSelected(user));
    socket.emit(SocketEvents.USER_MESSAGES, user);
    dispatch(messageSeen(user.userId));
  };

  const selectFriend = (friend) => {
    dispatch(userSelected(friend));
  };

  const addFriend = (friend) => {
    dispatch(actionStarted());
    socket.emit(SocketEvents.ADD_FRIEND, friend, ({ result, error }) => {
      if (result) {
        dispatch(addedAsFriend());
        if (user.userId) {
          const updateFriend = { ...user };
          updateFriend.sentRequest = true;
          updateFriend.isAdded = false;
          dispatch(userSelected(updateFriend));
        }
      }
      if (error) {
        console.log(error);
      }
      dispatch(actionEnded());
    });
  };

  const RenderSearchedUsers = ({ user }) => {
    return (
      <Entity
        entity={user}
        image={user.image}
        selectEntity={(user) => selectFriend(user)}
        title={user.username}
        SubTitle={
          <React.Fragment>
            <div className="flex justify-start items-center">
              <BadgeCheckIcon className="text-blue-400 lg:h-3 lg:w-3 xl:h-4 xl:w-4 2xl:h-6 2xl:w-6" />
              <span className="text-green-300 truncate lg:text-xs 2xl:text-base">
                Verified
              </span>
            </div>
          </React.Fragment>
        }
        Options={
          <React.Fragment>
            {user.sentRequest === false &&
              user.isAdded === false &&
              (actionLoading ? (
                <SpinnerIcon className="lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-11 2xl:w-11" />
              ) : (
                <PlusIcon
                  className="lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-11 2xl:w-11"
                  onClick={() => addFriend(user)}
                />
              ))}
            {user.sentRequest === true && user.isAdded === false && (
              <ClockIcon className="text-yellow-500 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-12 2xl:w-12" />
            )}
            {user.hasRequested === true && (
              <ClockIcon className="text-white lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-12 2xl:w-12" />
            )}
            {user.sentRequest === false && user.isAdded === true && (
              <AnnotationIcon
                className="lg:h-8 lg:w-8 xl:h-8 xl:w-8 2xl:h-11 2xl:w-11"
                onClick={() => openChat(user)}
              />
            )}
          </React.Fragment>
        }
      />
    );
  };

  return (
    <React.Fragment>
      <Search
        onKeyPress={(value) => onSearch(value)}
        isClear={() => isClear()}
      />
      <div className="flex flex-row flex-1 overflow-y-auto w-full">
        <div className="w-full h-full">
          {searchResults === true &&
            (isLoading === false ? (
              searchedUsers.userId ? (
                <RenderSearchedUsers user={searchedUsers} />
              ) : (
                <div className="flex h-full items-center justify-center">
                  No users found!
                </div>
              )
            ) : (
              <div className="flex h-full items-center justify-center">
                <SpinnerIcon className="mt-2 h-10 w-10" />
              </div>
            ))}
          {searchResults === false && (
            <div className="flex h-full items-center justify-center">
              Search a friend by Email Id
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchFriends;
