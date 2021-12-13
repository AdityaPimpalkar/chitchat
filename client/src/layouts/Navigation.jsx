import React from "react";

const Navigation = ({
  user,
  toggleChats,
  toggleGroups,
  toggleFriends,
  directMessage,
  group,
  friends,
}) => {
  return (
    <div className="grid grid-cols-3 w-full bg-purple-900 shadow-xl">
      <div className="flex flex-row items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="lg:h-6 w-6 mx-2 xl:h-8 w-8 2xl:h-12 w-12"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
          <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
        </svg>
        <span className="lg:text-base font-medium xl:text-lg 2xl:text-xl">
          chitchat.io
        </span>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div className="grid grid-cols-3 w-full">
          <button onClick={() => toggleChats()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`mx-auto ${
                directMessage
                  ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
                  : "lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button onClick={() => toggleGroups()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`mx-auto ${
                group
                  ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
                  : "lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          </button>
          <button onClick={() => toggleFriends()}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`mx-auto ${
                friends
                  ? "text-yellow-500 lg:h-7 lg:w-7 xl:h-8 xl:w-8 2xl:h-10 2xl:w-10"
                  : "lg:h-6 lg:w-6 xl:h-7 xl:w-7 2xl:h-8 2xl:w-8"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-row-reverse items-center">
        <img src={user.image} className="hidden" alt="user" />
        <img
          src={user.image}
          className="rounded-full border-2 border-yellow-500 mx-2 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-12 2xl:w-12"
          alt="user"
        />
        <span className="lg:text-sm xl:text-base 2xl:text-lg">
          {user.username}
        </span>
      </div>
    </div>
  );
};

export default Navigation;
