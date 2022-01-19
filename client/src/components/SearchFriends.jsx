import React from "react";
import {
  BadgeCheckIcon,
  ClockIcon,
  PlusIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";

const SearchFriends = ({
  searchedFriends,
  selectFriend,
  openChat,
  addFriend,
}) => {
  return (
    <div className="flex flex-row overflow-y-auto w-full">
      <div className="w-full">
        {searchedFriends.length > 0 ? (
          searchedFriends.map((user, index) => {
            return (
              <div
                key={index}
                className="flex flex-row cursor-pointer w-full lg:py-1 pr-2 xl:py-2"
              >
                <div
                  className="flex flex-col justify-center items-center"
                  onClick={() => selectFriend(user)}
                >
                  <img
                    src={user.image}
                    className="rounded-full border-2 lg:mx-2 xl:mx-2 2xl:mx-4 lg:h-11 lg:w-11 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16"
                    alt="user"
                  />
                </div>
                <div className="flex flex-col flex-1 justify-center items-center lg:w-80">
                  <div className="flex flex-row w-full">
                    <div
                      className="flex flex-col border-b border-purple-400 flex-shrink w-3/4"
                      onClick={() => selectFriend(user)}
                    >
                      <span className="text-left italic truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-xl 2xl:font-semibold">
                        {user.username}
                      </span>
                      <div className="flex justify-start items-center">
                        <BadgeCheckIcon className="text-blue-400 lg:h-3 lg:w-3 xl:h-4 xl:w-4 2xl:h-6 2xl:w-6" />
                        <span className="text-green-300 truncate lg:text-xs 2xl:text-base">
                          Verified
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center border-b border-purple-400 flex-1">
                      {user.sentRequest === false && user.isAdded === false && (
                        <PlusIcon
                          className="lg:h-5 lg:w-5 xl:h-9 xl:w-9 2xl:h-12 2xl:w-12"
                          onClick={() => addFriend(user)}
                        />
                      )}
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
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="d-flex h-100 text-center">No results found.</div>
        )}
      </div>
    </div>
  );
};

export default SearchFriends;
