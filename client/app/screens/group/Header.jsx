import React from "react";

const Header = ({ group, user }) => {
  return (
    <div className="chatheader w-full py-2 pl-1 pr-5">
      <div className="lg:p-1 rounded-full bg-purple-600 items-center shadow-lg">
        <div className="flex flex-row text-left">
          {group.image ? (
            <img
              className="border-2 rounded-full mr-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
              src={group.image}
              alt="group"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="border-2 rounded-full mr-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
          )}

          <div className="flex flex-col w-4/5">
            <div className="lg:text-sm xl:text-base xl:font-semibold 2xl:text-lg 2xl:font-semibold">
              {group.name}
            </div>
            <div className="w-full flex flex-row items-center lg:mt-auto xl:mt-0">
              <span className="truncate italic lg:text-xs xl:text-sm 2xl:text-base">
                {group.members.map(
                  (member, index) =>
                    member.userId !== user.userId && (
                      <span key={index}> {member.username}, </span>
                    )
                )}
                You
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="align-items-start px-1 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
    //   <div className="d-flex align-items-center py-2">
    //     <div className="position-relative">
    //       <img
    //         src="https://i.pravatar.cc/300"
    //         className="rounded-circle mx-2"
    //         alt={user.username}
    //         width="40"
    //         height="40"
    //       />
    //     </div>
    //     <div className="d-flex flex-row position-relative w-100">
    //       <div className="d-flex flex-column me-auto">
    //         <strong>{group.name}</strong>
    //         <span>
    //           {group.members.map(
    //             (member, index) =>
    //               member.userId !== user.userId && (
    //                 <span key={index}> {member.username}, </span>
    //               )
    //           )}
    //           You
    //         </span>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Header;
