import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const Members = ({ users, selectUser }) => {
  return (
    <div className="chatbody lg:chatheight xl:chatheight-xl 2xl:chatheight-2xl overflow-y-auto rounded-t-xl h-4/5 bg-purple-600 text-left ml-2 mr-5">
      <ScrollableFeed>
        {users.length > 0 &&
          users.map((user, index) => {
            return (
              <div
                key={index}
                className="px-2 cursor-pointer"
                onClick={() => selectUser(user)}
              >
                <div className="flex flex-row align-items-center py-1">
                  <div className="d-flex flex-column position-relative">
                    <img
                      src={user.image}
                      className="ml-1 my-1 mr-2 rounded-full border-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
                      alt={user.username}
                      width="45"
                      height="45"
                    />
                    {user.isSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="isSelected h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                  <div className="d-flex flex-row position-relative ">
                    <strong className="italic me-auto lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-lg 2xl:font-semibold">
                      {user.username}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
      </ScrollableFeed>
    </div>
  );
};

export default Members;
