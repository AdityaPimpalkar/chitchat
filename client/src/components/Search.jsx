import React from "react";
import { SearchCircleIcon } from "@heroicons/react/outline";

const Search = ({ value, placeholder, onChange, onSearch }) => {
  return (
    <div className="bg-purple-800 shadow-xl lg:p-1 xl:p-2 2xl:p-3 border-b-2">
      <div className="flex flex-row">
        <div className="w-1/12">
          <div className="flex flex-col justify-center items-center">
            <SearchCircleIcon className="lg:h-9 w-9 xl:h-10 w-10 2xl:h-10 w-10" />
          </div>
        </div>
        <div className="w-10/12 flex justify-center items-center lg:ml-2 2xl:ml-2">
          <input
            className="bg-purple-800 w-full focus:outline-none lg:text-sm xl:text-base 2xl:text-lg"
            placeholder={placeholder}
            value={value}
            onChange={({ currentTarget: input }) => onChange(input.value)}
            onKeyPress={(e) =>
              e.code === "Enter"
                ? e.currentTarget.value !== ""
                  ? onSearch()
                  : null
                : null
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
