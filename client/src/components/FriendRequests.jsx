import React, { useState, useEffect } from "react";
import { BadgeCheckIcon, CheckIcon } from "@heroicons/react/solid";
import Search from "./common/Search";
import Entity from "./common/Entity";

const FriendRequests = ({ friendRequests, selectFriend, acceptRequest }) => {
  const [requests] = useState(friendRequests);
  const [searchedRequests, setSearchedRequests] = useState([]);
  const [searchResults, setsearchResults] = useState(false);

  useEffect(() => {}, [friendRequests]);

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

  const RenderFriendRequest = ({ requests }) => {
    return requests.length > 0 ? (
      requests.map((friend, index) => {
        <Entity
          key={index}
          entity={friend}
          image={friend.image}
          selectEntity={(entity) => selectFriend(entity)}
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
        />;
      })
    ) : (
      <div className="d-flex h-100 text-center">No new requests.</div>
    );
  };

  return (
    <React.Fragment>
      <Search
        onKeyPress={(value) => onSearch(value)}
        isClear={() => isClear()}
      />
      <div className="flex flex-row overflow-y-auto w-full">
        <div className="w-full">
          {searchResults === true &&
            (searchedRequests.length > 0 ? (
              <RenderFriendRequest requests={requests} />
            ) : (
              <div className="d-flex h-100 text-center">Not found!</div>
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
