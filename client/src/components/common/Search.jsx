import React, { useState } from "react";
import { SearchCircleIcon } from "@heroicons/react/outline";
const Search = ({ placeholder, value, onChange, onKeyPress, isClear }) => {
  const [search, setSearch] = useState("");

  const onChangeInput = (value) => {
    setSearch(value);
    if (value === "") isClear();
  };
  return (
    <div className="flex flex-row border-b p-2">
      <div className="flex flex-col justify-center items-center bg-transparent mr-2">
        <SearchCircleIcon className="lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-12 2xl:w-12" />
      </div>
      <input
        className="bg-transparent w-full focus:outline-none lg:text-sm xl:text-base 2xl:text-lg"
        placeholder="Search"
        value={search}
        onChange={({ currentTarget: input }) => onChangeInput(input.value)}
        onKeyPress={(e) =>
          e.code === "Enter"
            ? e.currentTarget.value !== ""
              ? onKeyPress(e.currentTarget.value)
              : null
            : null
        }
      />
    </div>
  );
};

export default Search;
