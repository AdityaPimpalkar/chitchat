import React from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";

const ChatInput = ({ message, setMessage, sendMessage, isConnected }) => {
  return (
    <div className="flex">
      <div className="flex flex-row w-full bg-purple-900 p-2">
        <div className="flex justify-center items-center w-full">
          <div className="flex flex-1">
            <input
              className="flex flex-1 rounded-lg lg:h-9 xl:h-11 2xl:h-14 border-0 bg-purple-700 px-3 text-white shadow-xl focus:outline-none focus:shadow-xl lg:text-sm 2xl:text-lg"
              placeholder="Type your message..."
              name="message"
              autoComplete="off"
              autoCapitalize="on"
              value={message}
              disabled={isConnected ? false : true}
              onChange={({ currentTarget: input }) => setMessage(input.value)}
              onKeyPress={(e) =>
                e.code === "Enter"
                  ? e.currentTarget.value !== ""
                    ? isConnected
                      ? sendMessage()
                      : null
                    : null
                  : null
              }
            />
          </div>
        </div>
        <button
          disabled={isConnected ? false : true}
          className={isConnected ? "" : "cursor-not-allowed"}
          onClick={() => sendMessage()}
        >
          <PaperAirplaneIcon className="rounded-full ml-2 shadow-xl bg-yellow-500 lg:py-2 lg:px-2 lg:h-9 lg:w-9 xl:py-3 xl:px-2 xl:h-11 xl:w-11 2xl:h-14 2xl:w-14" />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
