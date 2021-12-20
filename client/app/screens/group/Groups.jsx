import React from "react";

const Groups = ({ user, groups, selectGroup, toggleNewGroup }) => {
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
                placeholder="Search Groups"
              />
            </div>
            <div className="w-1/12 cursor-pointer">
              <div
                className="flex flex-col justify-center items-center"
                onClick={() => toggleNewGroup(true)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="lg:h-9 w-9 xl:h-10 w-10 2xl:h-10 w-10"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-3 mt-2 ml-5">
        <div className="text-left">
          <div className="lg:chatentity xl:chatentity-xl 2xl:chatentity-2xl h-full rounded-xl bg-purple-700 shadow-xl">
            <div className="h-full overflow-y-auto rounded-xl">
              {groups.length > 0 ? (
                groups.map((group, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row cursor-pointer lg:py-1 pr-2 xl:py-2"
                      onClick={() => selectGroup(group)}
                    >
                      <div className="flex flex-col justify-center items-center lg:w-1/6 xl:w-2/12">
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
                            version="1.1"
                          >
                            <g transform="translate(0 -1028.4)">
                              <g
                                fill="#bdc3c7"
                                transform="matrix(0.77981 0 0 0.78862 2.9634 174.84)"
                              >
                                <path
                                  transform="translate(6 1088.4)"
                                  d="m 17 4 a 5 5 0 1 1 -10 0 a 5 5 0 1 1 10 0 Z"
                                />
                                <path d="m 18 1096.4 c -1.277 0 -2.494 0.2 -3.594 0.7 c -2.885 1.3 -4.9779 4 -5.3435 7.3 c 0 1.1 0.8329 2 1.9375 2 h 14 c 1.105 0 1.938 -0.9 1.938 -2 c -0.366 -3.3 -2.459 -6 -5.344 -7.3 c -1.1 -0.5 -2.317 -0.7 -3.594 -0.7 Z" />
                              </g>
                              <g
                                fill="#7f8c8d"
                                transform="matrix(0.77981 0 0 0.78862 -7.0366 174.84)"
                              >
                                <path
                                  transform="translate(6 1088.4)"
                                  d="m 17 4 a 5 5 0 1 1 -10 0 a 5 5 0 1 1 10 0 Z"
                                />
                                <path d="m 18 1096.4 c -1.277 0 -2.494 0.2 -3.594 0.7 c -2.885 1.3 -4.9779 4 -5.3435 7.3 c 0 1.1 0.8329 2 1.9375 2 h 14 c 1.105 0 1.938 -0.9 1.938 -2 c -0.366 -3.3 -2.459 -6 -5.344 -7.3 c -1.1 -0.5 -2.317 -0.7 -3.594 -0.7 Z" />
                              </g>
                              <path
                                fill="#2c3e50"
                                d="m 8.4062 1041.1 c -2.8856 1.3 -4.9781 4 -5.3437 7.3 c 0 1.1 0.8329 2 1.9375 2 h 14 c 1.105 0 1.938 -0.9 1.938 -2 c -0.366 -3.3 -2.459 -6 -5.344 -7.3 c -0.649 1.3 -2.011 2.3 -3.594 2.3 s -2.9453 -1 -3.5938 -2.3 Z"
                              />
                              <path
                                fill="#34495e"
                                transform="translate(0 1031.4)"
                                d="m 17 4 a 5 5 0 1 1 -10 0 a 5 5 0 1 1 10 0 Z"
                              />
                              <path
                                fill="#34495e"
                                transform="translate(0 1028.4)"
                                d="m 12 11 c -1.277 0 -2.4943 0.269 -3.5938 0.75 c -2.8856 1.262 -4.9781 3.997 -5.3437 7.25 c 0 1.105 0.8329 2 1.9375 2 h 14 c 1.105 0 1.938 -0.895 1.938 -2 c -0.366 -3.253 -2.459 -5.988 -5.344 -7.25 c -1.1 -0.481 -2.317 -0.75 -3.594 -0.75 Z"
                              />
                            </g>
                          </svg>
                        )}
                      </div>
                      <div className="flex flex-col  border-b border-purple-400 lg:w-4/5 xl:w-10/12">
                        <div className="flex flex-row w-full">
                          <div className="flex flex-col flex-shrink w-3/4">
                            <span className="italic truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-lg 2xl:font-semibold">
                              {group.name}
                            </span>
                            <span className="text-purple-300 truncate lg:text-xs 2xl:text-base">
                              {/* {group.members.map(
                                (member, index) =>
                                  member.userId !== user.userId && (
                                    <span key={index}> {member.username}, </span>
                                  )
                              )} */}
                              Casey,John,feqw,efgw,gwe,gwegwrggew,gwrgrwgr,wrgwrgwreg,hytretherhet,hgerhwrht,You
                            </span>
                          </div>
                          <div className="flex flex-grow flex-col w-1/4 justify-center items-center border-b-1">
                            <span className="text-xxs truncate xl:text-xs 2xl:text-sm">
                              12:30 PM
                            </span>
                            {group.hasNewMessage && (
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
                  No groups found
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="d-flex flex-column col-3 col-lg-3 col-xl-3 p-0 border-left-info">
    //   {groups.length > 0 ? (
    //     groups.map((group, index) => {
    //       return (
    //         <div
    //           key={index}
    //           className="py-1 px-1 border-bottom border-info w-100 cursor-pointer"
    //           onClick={() => selectGroup(group)}
    //         >
    //           <div className="d-flex align-items-center py-1">
    //             <div className="position-relative">
    //               <img
    //                 src="https://i.pravatar.cc/300"
    //                 className="rounded-circle mx-2"
    //                 alt=""
    //                 width="40"
    //                 height="40"
    //               />
    //             </div>
    //             <div className="d-flex flex-row position-relative w-100">
    //               <div className="d-flex flex-column me-auto">
    //                 <strong>{group.name}</strong>
    //                 <span>
    //                   {group.members.map(
    //                     (member, index) =>
    //                       member.userId !== user.userId && (
    //                         <span key={index}> {member.username}, </span>
    //                       )
    //                   )}
    //                   You
    //                 </span>
    //               </div>

    //               <span
    //                 className={
    //                   group.hasNewMessage ? "new-message-alert mt-2" : ""
    //                 }
    //               ></span>
    //             </div>
    //           </div>
    //         </div>
    //       );
    //     })
    //   ) : (
    //     <div className="d-flex justify-content-center align-items-center chat-window">
    //       No Groups Found
    //     </div>
    //   )}
    // </div>
  );
};

export default Groups;
