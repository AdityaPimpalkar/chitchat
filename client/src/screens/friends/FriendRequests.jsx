import React from "react";

const FriendRequests = ({ friendRequests, selectFriend, acceptRequest }) => {
  return (
    friendRequests.length > 0 &&
    friendRequests.map((friend, index) => {
      return (
        <div
          key={index}
          className="flex flex-row cursor-pointer lg:py-1 pr-2 xl:py-2"
        >
          <div className="flex flex-col justify-center items-center lg:w-1/6 xl:w-2/12">
            <img
              src={friend.image}
              className="rounded-full border-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
              alt="img"
            />
          </div>
          <div className="flex flex-col  border-b border-purple-400 lg:w-4/5 xl:w-10/12">
            <div className="flex flex-row w-full">
              <div
                className="flex flex-col flex-shrink w-3/4"
                onClick={() => selectFriend(friend)}
              >
                <div className="flex flex-row">
                  <span className="italic my-auto truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-lg 2xl:font-semibold">
                    {friend.username}
                  </span>
                  <div className="flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-blue-400 ml-2 lg:h-3 lg:w-3 xl:h-5 xl:w-5 2xl:h-6 2xl:w-6"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>

                <span className="italic text-green-300 truncate lg:text-xs 2xl:text-sm">
                  Verified
                </span>
              </div>
              <div className="flex flex-grow flex-col w-1/4 justify-center items-end border-b-1">
                {friend.isAdded && (
                  <button className="flex flex-fill justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 lg:h-5 lg:w-5 xl:h-8 xl:w-8 2xl:h-14 2xl:w-14"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  </button>
                )}
                {!friend.isAdded && (
                  <button
                    className="flex flex-fill justify-center items-center"
                    onClick={() => acceptRequest(friend)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 lg:h-5 lg:w-5 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
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
                )}
              </div>
            </div>
          </div>
        </div>
      );
    })
  );
};

export default FriendRequests;
