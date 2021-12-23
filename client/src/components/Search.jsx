import React from "react";

const Search = ({}) => {
  return (
    <div className="flex flex-row p-2 shadow-xl">
      <div className="flex flex-col justify-center items-center bg-transparent mr-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-12 2xl:w-12"
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
      <input
        className="bg-transparent w-full focus:outline-none lg:text-sm xl:text-base 2xl:text-lg"
        placeholder="Search Chats"
      />
    </div>
  );
};

export default Search;
