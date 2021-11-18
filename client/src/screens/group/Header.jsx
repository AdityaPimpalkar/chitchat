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
            <img
              className="border-2 rounded-full mr-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
              src="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-group-512.png"
              alt="group"
            />
          )}

          <div className="flex flex-col w-4/5">
            <div className="lg:text-sm xl:text-base xl:font-semibold 2xl:text-lg 2xl:font-semibold">
              {group.name} Cool Friends
            </div>
            <div className="w-full flex flex-row items-center lg:mt-auto xl:mt-0">
              <span className="truncate italic lg:text-xs xl:text-sm 2xl:text-base">
                {/* {group.members.map(
                  (member, index) =>
                    member.userId !== user.userId && (
                      <span key={index}> {member.username}, </span>
                    )
                )} */}
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
