import React from "react";

const Header = ({ user }) => {
  return (
    <div className="w-full stickey top-0">
      <div className="lg:p-1 bg-purple-700 items-center shadow-lg">
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
    // <div className="align-items-start py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
    //   <div className="d-flex align-items-center py-1">
    //     <div className="position-relative">
    //       <img
    //         src="https://i.pravatar.cc/300"
    //         className="rounded-circle mx-2"
    //         alt={user.username}
    //         width="40"
    //         height="40"
    //       />
    //     </div>
    //     <div className="flex-grow-1">
    //       <strong>{user.username}</strong>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Header;
