import React from "react";
import FindFriends from "./FindFriends";
import FriendRequests from "./FriendRequests";

const Friends = ({
  isLoading,
  search,
  requests,
  friends,
  selectFriend,
  setSearch,
  searchFriend,
  findFriends,
  friendRequests,
  toggleFindFriends,
  toggleFriendRequests,
  acceptRequest,
}) => {
  return (
    <div className="w-2/6">
      <div className="lg:pl-5 pb-0 pt-2 pr-3">
        <div className="rounded-full bg-purple-700 shadow-xl lg:p-1 xl:p-2 2xl:p-3">
          <div className="flex flex-row">
            <div className="w-1/12">
              <div className="flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:h-9 w-9 xl:h-10 w-10 2xl:h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="w-10/12 flex justify-center items-center lg:ml-2 2xl:ml-2">
              <input
                className="bg-purple-700 w-full focus:outline-none lg:text-sm xl:text-base 2xl:text-lg"
                placeholder="Search an Email-Id..."
                value={search}
                onChange={({ currentTarget: input }) => setSearch(input.value)}
                onKeyPress={(e) =>
                  e.code === "Enter"
                    ? e.currentTarget.value !== ""
                      ? searchFriend()
                      : null
                    : null
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3 mt-2 ml-5">
        <div className="text-left">
          <div className="flex flex-row justify-center items-center bg-purple-700 rounded-t-xl">
            <div className="w-full">
              <button
                className={`w-1/2 lg:text-sm xl:text-base 2xl:text-xl 2xl:border-b-3 lg:h-5 xl:h-8 2xl:h-14 ${
                  friendRequests && "border-b-2 border-yellow-500"
                }`}
                onClick={() => toggleFriendRequests()}
              >
                Friend Requests
              </button>
              <button
                className={`w-1/2 lg:text-sm xl:text-base 2xl:text-xl 2xl:border-b-3 lg:h-5 xl:h-8 2xl:h-14 ${
                  findFriends && "border-b-2 border-yellow-500"
                }`}
                onClick={() => toggleFindFriends()}
              >
                Find Friends
              </button>
            </div>
          </div>
          <div className="lg:friendentity xl:friendentity-xl 2xl:friendentity-2xl h-full bg-purple-700 shadow-xl rounded-b-xl">
            <div className="h-full overflow-y-auto rounded-xl">
              {isLoading && (
                <div className="mt-2 w-100">
                  <svg
                    className="animate-spin mx-auto -ml-1 mr-3 h-10 w-10 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              )}
              {findFriends === true && isLoading === false && (
                <FindFriends friends={friends} selectFriend={selectFriend} />
              )}
              {friendRequests === true && isLoading === false && (
                <FriendRequests
                  friendRequests={requests}
                  selectFriend={selectFriend}
                  acceptRequest={acceptRequest}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Friends;
