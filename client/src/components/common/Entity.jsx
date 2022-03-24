import React from "react";

const Entity = ({ entity, image, title, SubTitle, Options, selectEntity }) => {
  return (
    <div className="flex flex-row cursor-pointer w-full lg:py-1 pr-2 xl:py-2">
      <div className="flex flex-col justify-center items-center">
        <img
          src={image}
          className="rounded-full border-2 lg:mx-2 xl:mx-2 2xl:mx-4 lg:h-11 lg:w-11 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16"
          alt="user"
          onClick={() => selectEntity(entity)}
        />
      </div>
      <div className="flex flex-col flex-1 justify-center items-center lg:w-80">
        <div className="flex flex-row w-full">
          <div
            className="flex flex-col border-b border-purple-400 flex-shrink w-3/4"
            onClick={() => selectEntity(entity)}
          >
            <span className="text-left italic truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-xl 2xl:font-semibold">
              {title}
            </span>
            <span className="text-purple-300 truncate lg:text-xs 2xl:text-base">
              {SubTitle}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-b border-purple-400 flex-1">
            {Options}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Entity;
