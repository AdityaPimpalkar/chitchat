import React from "react";

const Body = ({
  selectedFriend,
  addFriend,
  openChat,
  findFriends,
  friendRequests,
  acceptRequest,
}) => {
  let renderAddFriend = false;
  let renderAwaitingResponse = false;
  let renderOpenChat = false;
  if (selectedFriend.sentRequest === false && selectedFriend.isAdded === true) {
    renderOpenChat = true;
  } else if (
    selectedFriend.sentRequest === true &&
    selectedFriend.isAdded === false
  ) {
    renderAwaitingResponse = true;
  } else {
    renderAddFriend = true;
  }

  return (
    <div className="h-100 overflow-y-auto rounded-xl h-4/5 bg-purple-600 text-left ml-2 mr-5 mt-2">
      <div className="w-100 text-center flex flex-col justify-content items-center">
        <img
          src={selectedFriend.image}
          className="rounded-full mt-5 mb-2 mx-auto border-2 lg:h-36 lg:w-36 xl:h-48 xl:w-48 2xl:h-64 2xl:w-64"
          alt="img"
        />
        <div className="flex flex-row justify-center items-center">
          <span className="my-auto truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-2xl 2xl:font-semibold">
            {selectedFriend.username}
          </span>

          <div className="flex justify-center items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-blue-400 ml-1 lg:h-3 lg:w-3 xl:h-5 xl:w-5 2xl:h-8 2xl:w-8"
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
        <span className="italic my-auto mb-1 truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-xl 2xl:font-semibold">
          {selectedFriend.email}
        </span>
        <span className="italic mb-3 text-green-300 truncate lg:text-xs 2xl:text-lg">
          Verified
        </span>
        {findFriends && renderAwaitingResponse && (
          <div className="flex flex-row justify-center items-center bg-yellow-600 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" lg:h-5 lg:w-5 xl:h-8 xl:w-8 2xl:h-14 2xl:w-14"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="mr-2">Waiting for approval</span>
          </div>
        )}
        {findFriends && renderAddFriend && (
          <button
            className="border-2 pr-2 rounded-lg flex flex-fill justify-center items-center text-semibold hover:bg-yellow-500 hover:shadow-xl"
            onClick={() => addFriend()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lg:h-5 lg:w-5 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add as friend
          </button>
        )}
        {findFriends && renderOpenChat && (
          <button
            className="border-2 pr-2 rounded-lg flex flex-fill justify-center items-center text-semibold hover:bg-yellow-500 hover:shadow-xl"
            onClick={() => openChat(selectedFriend)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lg:h-5 lg:w-5 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                clip-rule="evenodd"
              />
            </svg>
            Open Chat
          </button>
        )}
        {friendRequests && (
          <button
            className="border-2 pr-2 rounded-lg flex flex-fill justify-center items-center hover:bg-green-500 hover:shadow-xl"
            onClick={() => acceptRequest(selectedFriend)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="lg:h-5 lg:w-5 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              />
            </svg>
            Accept friend request
          </button>
        )}
      </div>
    </div>
  );
};

export default Body;
