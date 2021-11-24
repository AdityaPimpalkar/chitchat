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
          <button
            className={
              directMessage
                ? "border-b-2 rounded-full border-yellow-500 lg:text-sm xl:text-base 2xl:text-xl 2xl:border-b-3"
                : "border-b-2 border-purple-900 lg:text-sm xl:text-base 2xl:text-xl 2xl:border-b-3"
            }
            onClick={() => toggleChats()}
          >
            Chats
          </button>
          <button
            className={
              group
                ? "border-b-2 rounded-full border-yellow-500 lg:text-sm xl:text-base 2xl:text-xl 2xl:border-b-3"
                : "border-b-2 border-purple-900 lg:text-sm xl:text-base 2xl:text-xl 2xl:border-b-3"
            }
            onClick={() => toggleGroups()}
          >
            Groups
          </button>
          <button
            className={
              friends
                ? "border-b-2 rounded-full border-yellow-500 lg:text-sm xl:text-base 2xl:text-xl 2xl:border-b-3"
                : "border-b-2 border-purple-900 lg:text-sm xl:text-base 2xl:text-xl 2xl:border-b-3"
            }
            onClick={() => toggleFriends()}
          >
            Friends
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
