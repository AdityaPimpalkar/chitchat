import React from "react";

const Users = ({ users, selectUser }) => {
  return (
    <div className="flex flex-row overflow-y-auto w-full">
      <div className="w-full">
        {users.length > 0 ? (
          users.map((user, index) => {
            return (
              <div
                key={index}
                className="flex flex-row cursor-pointer w-full lg:py-1 pr-2 xl:py-2"
                onClick={() => selectUser(user)}
              >
                <div className="flex flex-col justify-center items-center">
                  <img
                    src={user.image}
                    className="rounded-full border-2 lg:mx-2 xl:mx-2 2xl:mx-4 lg:h-11 lg:w-11 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16"
                    alt="user"
                  />
                </div>
                <div className="flex flex-col flex-1 justify-center items-center lg:w-80">
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col border-b border-purple-400 flex-shrink w-3/4">
                      <span className="text-left italic truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-xl 2xl:font-semibold">
                        {user.username}
                      </span>
                      <span className="text-purple-300 truncate lg:text-xs 2xl:text-base">
                        Hi there, how are you? Hope everything is alright
                      </span>
                    </div>
                    <div className="flex flex-col items-center border-b border-purple-400 flex-1">
                      <span className="my-1 mx-2 lg:text-xxs truncate xl:text-xs 2xl:text-sm">
                        12:30 PM
                      </span>
                      {user.hasNewMessage && (
                        <span className="lg:h-4 lg:w-4 xl:h-5 lg:w-5 2xl:h-6 2xl:w-6 rounded-full bg-yellow-500 justify-center flex items-center">
                          <span className="lg:text-xs xl:text-sm 2xl:text-base font-semibold"></span>
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
  );
};

export default Users;
