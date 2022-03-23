import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BadgeCheckIcon, CheckIcon } from "@heroicons/react/solid";
import socket from "../../www/socket";
import SocketEvents from "../../events/constants";
import {
  actionStarted,
  actionEnded,
  userSelected,
  entityCleared,
} from "../../store/entity";
import { requestAccepted } from "../../store/entities/requests";
import { chatAdded } from "../../store/entities/conversations";
import { chatPinged } from "../../store/navigation";
import Search from "../common/Search";
import Entity from "../common/Entity";

const FriendRequests = () => {
  const requests = useSelector((state) => state.entities.requests);
  const dispatch = useDispatch();
  const [searchedRequests, setSearchedRequests] = useState([]);
  const [searchResults, setsearchResults] = useState(false);

  const onSearch = (value) => {
    setsearchResults(true);
    const searchedRequests = requests.filter(
      (request) => request.username.toLowerCase() === value
    );
    setSearchedRequests(searchedRequests || []);
  };

  const isClear = () => {
    setsearchResults(false);
    setSearchedRequests([]);
  };

  const selectFriend = (friend) => {
    const updatedFriend = { ...friend };
    updatedFriend.hasRequested = true;
    dispatch(userSelected(updatedFriend));
  };

  const acceptRequest = (friend) => {
    dispatch(actionStarted());
    socket.emit(SocketEvents.ACCEPT_REQUEST, friend, ({ result, error }) => {
      if (result) {
        dispatch(requestAccepted(friend));
        dispatch(chatPinged());
        dispatch(chatAdded(friend));
        dispatch(entityCleared());
      }
      if (error) {
        console.log(error);
      }
      dispatch(actionEnded());
    });
  };

  const RenderFriendRequest = ({ requests }) => {
    return requests.length > 0 ? (
      requests.map((friend, index) => (
        <Entity
          key={index}
          entity={friend}
          image={friend.image}
          selectEntity={(friend) => selectFriend(friend)}
          title={friend.username}
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
              <button onClick={() => acceptRequest(friend)}>
                <CheckIcon className="lg:h-5 lg:w-5 xl:h-9 xl:w-9 2xl:h-11 2xl:w-11" />
              </button>
            </React.Fragment>
          }
        />
      ))
    ) : (
      <div className="flex h-full items-center justify-center">
        No new requests.
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
        <div className="w-full">
          {searchResults === true &&
            (searchedRequests.length > 0 ? (
              <RenderFriendRequest requests={searchedRequests} />
            ) : (
              <div className="flex h-full items-center justify-center">
                Not found!
              </div>
            ))}
          {searchResults === false && (
            <RenderFriendRequest requests={requests} />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default FriendRequests;
