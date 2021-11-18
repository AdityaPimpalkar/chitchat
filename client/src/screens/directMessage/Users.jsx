import React from "react";

const Users = ({ users, selectUser }) => {
  return (
    <div className="w-2/6">
      <div className="lg:pl-5 pb-0 pt-2 pr-3">
        <div className="rounded-full bg-purple-700 shadow-xl lg:p-1 xl:p-2 2xl:p-3">
          <div className="flex flex-row">
            <div className="w-1/12">
              <div className="flex flex-col justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:h-9 w-9 xl:h-10 w-10 2xl:h-10 w-10"
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
            </div>
            <div className="w-10/12 flex justify-center items-center lg:ml-2 2xl:ml-2">
              <input
                className="bg-purple-700 w-full focus:outline-none lg:text-sm xl:text-base 2xl:text-lg"
                placeholder="Search Chats"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3 mt-2 ml-5">
        <div className="text-left">
          <div className="lg:chatentity xl:chatentity-xl 2xl:chatentity-2xl h-full rounded-xl bg-purple-700 shadow-xl">
            <div className="h-full overflow-y-auto rounded-xl">
              {users.length > 0 ? (
                users.map((user, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row cursor-pointer lg:py-1 pr-2 xl:py-2"
                      onClick={() => selectUser(user)}
                    >
                      <div className="flex flex-col justify-center items-center lg:w-1/6 xl:w-2/12">
                        <img
                          src={user.image}
                          className="rounded-full border-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
                          alt="user"
                        />
                      </div>
                      <div className="flex flex-col  border-b border-purple-400 lg:w-4/5 xl:w-10/12">
                        <div className="flex flex-row w-full">
                          <div className="flex flex-col flex-shrink w-3/4">
                            <span className="italic truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-lg 2xl:font-semibold">
                              {user.username}
                            </span>
                            <span className="text-purple-300 truncate lg:text-xs 2xl:text-base">
                              Hi there, how are you? Hope everything is alright
                            </span>
                          </div>
                          <div className="flex flex-grow flex-col w-1/4 justify-center items-center border-b-1">
                            <span className="text-xxs truncate xl:text-xs 2xl:text-sm">
                              12:30 PM
                            </span>
                            {user.hasNewMessage && (
                              <span className="lg:h-4 w-4 rounded-full bg-yellow-500 justify-center flex items-center">
                                <span className="lg:text-xs font-semibold"></span>
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="d-flex h-100 justify-content-center align-items-center chat-window">
                  No users connected
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="d-flex flex-column col-3 col-lg-3 col-xl-3 p-0 border-right-info">
    //   <div className="align-items-start py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
    //     <div className="d-flex align-items-center py-1">
    //       <div className="position-relative">
    //         <img
    //           src="https://i.pravatar.cc/300"
    //           className="rounded-circle mx-2"
    //           alt={user.username}
    //           width="40"
    //           height="40"
    //         />
    //       </div>
    //       <div className="flex-grow-1">{user.username}</div>
    //       <span
    //         className="px-2 cursor-pointer text-info"
    //         onClick={() => toggleNewGroup(true)}
    //       >
    //         <i className="fa fa-plus-circle fa-lg"></i>
    //       </span>
    //     </div>
    //   </div>
    //   {users.length > 0 ? (
    //     users.map((user, index) => {
    //       return (
    //         <div
    //           key={index}
    //           className="py-2 px-2 border-bottom border-info d-lg-block cursor-pointer"
    //           onClick={() => selectUser(user)}
    //         >
    //           <div className="d-flex align-items-center py-1">
    //             <div className="d-flex flex-column position-relative">
    //               <img
    //                 src={`https://i.pravatar.cc/3${index + 1}`}
    //                 className="rounded-circle mx-2"
    //                 alt={user.username}
    //                 width="45"
    //                 height="45"
    //               />
    //               <span
    //                 className={user.connected ? "online" : "offline"}
    //               ></span>
    //             </div>
    //             <div className="d-flex flex-row position-relative w-100">
    //               <strong className="me-auto">{user.username}</strong>
    //               <span
    //                 className={
    //                   user.hasNewMessage ? "new-message-alert mt-2" : ""
    //                 }
    //               ></span>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })
    //   ) : (
    //     <div className="d-flex justify-content-center align-items-center chat-window">
    //       No Users Connected
    //     </div>
    //   )}
    // </div>
  );
};

export default Users;
