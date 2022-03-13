import React, { useState } from "react";
import {
  BadgeCheckIcon,
  ClockIcon,
  // PlusIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";
import socket from "../www/socket";
import Search from "./common/Search";
import Entity from "./common/Entity";
import SpinnerIcon from "./common/SpinnerIcon";
import SocketEvents from "../events/constants";

const SearchFriends = ({ selectFriend, openChat }) => {
  const [searchedUsers, setSearchedUsers] = useState([]);
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
        if (result) searchedFriend(data);
        if (error) console.log(error);
      }
    );
  };

  const searchedFriend = (friend) => {
    if (friend) setSearchedUsers([friend]);
    else setSearchedUsers([]);
  };

  const isClear = () => {
    setsearchResults(false);
    setSearchedUsers([]);
  };

  const RenderSearchedUsers = ({ searchedUsers }) => {
    return searchedUsers.length > 0 ? (
      searchedUsers.map((user, index) => (
        <Entity
          key={index}
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
              {/* {user.sentRequest === false && user.isAdded === false && (
                <PlusIcon
                  className="lg:h-5 lg:w-5 xl:h-9 xl:w-9 2xl:h-12 2xl:w-12"
                  onClick={() => addNewFriend(user)}
                />
              )} */}
              {user.sentRequest === true && user.isAdded === false && (
                <ClockIcon className="text-yellow-500 lg:h-5 lg:w-5 xl:h-9 xl:w-9 2xl:h-12 2xl:w-12" />
              )}
              {user.hasRequested === true && (
                <ClockIcon className="text-white lg:h-5 lg:w-5 xl:h-9 xl:w-9 2xl:h-12 2xl:w-12" />
              )}
              {user.sentRequest === false && user.isAdded === true && (
                <AnnotationIcon
                  className="lg:h-5 lg:w-5 xl:h-8 xl:w-8 2xl:h-12 2xl:w-12"
                  onClick={() => openChat(user)}
                />
              )}
            </React.Fragment>
          }
        />
      ))
    ) : (
      <div className="flex h-full items-center justify-center">
        No results found.
      </div>
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
              searchedUsers.length > 0 ? (
                <RenderSearchedUsers searchedUsers={searchedUsers} />
              ) : (
                <div className="flex h-full items-center justify-center">
                  No users found!
                </div>
              )
            ) : (
              <div className="flex h-full items-center justify-center">
                <SpinnerIcon />
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
