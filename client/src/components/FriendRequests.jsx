import React from "react";

const FriendRequests = ({ friendRequests, selectFriend, acceptRequest }) => {
  return (
    <div className="flex flex-row overflow-y-auto w-full">
      <div className="w-full">
        {friendRequests.length > 0 ? (
          friendRequests.map((friend, index) => {
            return (
              <div
                key={index}
                className="flex flex-row cursor-pointer w-full lg:py-1 pr-2 xl:py-2"
                onClick={() => selectFriend(friend)}
              >
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={friend.image}
                    className="rounded-full border-2 lg:mx-2 xl:mx-2 2xl:mx-4 lg:h-11 lg:w-11 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16"
                    alt="user"
                  />
                </div>
                <div className="flex flex-col flex-1 justify-center items-center lg:w-80">
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col border-b border-purple-400 flex-shrink w-3/4">
                      <span className="text-left italic truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-xl 2xl:font-semibold">
                        {friend.username}
                      </span>
                      <div className="flex justify-start items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-blue-400 lg:h-3 lg:w-3 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <span className="text-green-300 truncate lg:text-xs 2xl:text-base">
                          Verified
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-center border-b border-purple-400 flex-1">
                      <button onClick={() => acceptRequest(friend)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="lg:h-5 lg:w-5 xl:h-8 xl:w-8 2xl:h-11 2xl:w-11"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="d-flex h-100 justify-content-center align-items-center chat-window">
            No requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendRequests;
