import React, { Component } from "react";

const GroupMessages = ({}) => {
  return (
    <div className="flex flex-1 overflow-y-auto paragraph px-4">
      <div className="text-left w-full">
        {messages.map((message, index, messageArr) => {
          return message.type === "joiningStatus" ? (
            <div key={index} className="text-center">
              <span className="text-italic text-sm">
                {message.addedBy.userId === user.userId
                  ? `You added ${message.username}`
                  : `${message.addedBy.username} added ${
                      message.userId === user.userId ? "You" : message.username
                    }`}
              </span>
            </div>
          ) : (
            <div
              key={index}
              className={`chatmessage flex ${
                message.userId === user.userId ? "flex-row" : "flex-row-reverse"
              } w-3/5 py-2`}
            >
              <div
                className={`inline-block ml-2 ${
                  message.userId === user.userId
                    ? "bg-purple-800"
                    : "bg-yellow-500"
                } shadow-xl lg:py-1 px-4 xl:py-3 px-4`}
              >
                <div className="lg:text-xxs xl:text-xs 2xl:text-sm">
                  <strong>
                    {messageArr[index - 1].from === message.from
                      ? message.from === user.userId
                        ? null
                        : null
                      : message.from === user.userId
                      ? "You"
                      : message.username}
                  </strong>
                </div>
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

export default GroupMessages;
