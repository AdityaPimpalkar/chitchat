import React from "react";

const DiretMessages = ({ user, messages }) => {
  return (
    <div className="flex flex-1 overflow-y-auto paragraph px-4">
      <div className="text-left w-full">
        {messages.map((message, index) => {
          return (
            <div
              key={index}
              className={
                message.userId === user.userId
                  ? "chatmessage flex flex-row w-3/5 mr-auto py-2"
                  : "chatmessage flex flex-row-reverse w-3/5 ml-auto py-2"
              }
            >
              <div
                className={
                  message.userId === user.userId
                    ? "inline-block ml-2 bg-purple-800 rounded-lg shadow-xl lg:py-1 px-4 xl:py-3 px-4"
                    : "inline-block mr-2 bg-yellow-500 rounded-lg shadow-xl lg:py-1 px-4 xl:py-3 px-4"
                }
              >
                <span className="lg:text-xs xl:text-sm 2xl:text-lg">
                  {message.message}
                </span>
                <div className="flex flex-row-reverse">
                  <span className="text-xxs xl:text-xs 2xl:text-sm">
                    12:24 PM
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiretMessages;
