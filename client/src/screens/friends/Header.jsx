import React from "react";

const Header = ({ user }) => {
  return (
    <div className="chatheader w-full py-2 pb-0 pl-1 pr-5">
      <div className="lg:p-1 rounded-full bg-purple-600 items-center shadow-lg">
        <div className="flex flex-row text-left">
          <img
            className="border-2 rounded-full mr-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
            src={user.image}
            alt="user"
          />
          <div className="flex flex-col w-4/5">
            <div className="lg:text-sm xl:text-base xl:font-semibold 2xl:text-lg 2xl:font-semibold">
              {user.username}
            </div>
            <div className="w-full flex flex-row items-center lg:mt-auto xl:mt-0">
              <span
                className={
                  user.connected
                    ? "lg:h-2 lg:w-2 rounded-full bg-green-400 lg:mr-1 2xl:h-3 2xl:w-3"
                    : "lg:h-2 lg:w-2 rounded-full bg-red-700 lg:mr-1 2xl:h-3 2xl:w-3"
                }
              ></span>
              <span className="italic lg:text-xs xl:text-sm 2xl:text-base">
                {user.connected ? "online" : "offline"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
{
}
