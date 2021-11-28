import React from "react";

const FindFriends = ({ friends, selectFriend }) => {
  return friends.length > 0 ? (
    friends.map((friend, index) => {
      return (
        <div
          key={index}
          className="flex flex-row cursor-pointer lg:py-1 pr-2 xl:py-2"
          onClick={() => selectFriend(friend)}
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
              <div className="flex flex-col flex-shrink w-3/4">
                <div className="flex flex-row">
                  <span className="italic my-auto truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-lg 2xl:font-semibold">
                    {friend.username}
                  </span>
                  <div className="flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-blue-400 ml-2 lg:h-3 lg:w-3 xl:h-5 xl:w-5 2xl:h-10 2xl:w-10"
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

                <span className="italic text-green-300 truncate lg:text-xs 2xl:text-base">
                  Verified
                </span>
              </div>
              <div className="flex flex-grow flex-col w-1/4 justify-center items-center border-b-1">
                {friend.isAdded && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-yellow-500 lg:h-5 lg:w-5 xl:h-8 xl:w-8 2xl:h-14 2xl:w-14"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                )}
                {!friend.isAdded && (
                  <button className="flex flex-fill justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="lg:h-5 lg:w-5 xl:h-8 xl:w-8 2xl:h-14 2xl:w-14"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
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
  ) : (
    <div className="d-flex h-100 justify-content-center align-items-center chat-window">
      Not found.
    </div>
  );
};

export default FindFriends;
