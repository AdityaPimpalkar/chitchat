import React from "react";

const ChatInput = ({ message, setMessage, sendMessage }) => {
  return (
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
            onChange={({ currentTarget: input }) => setMessage(input.value)}
            onKeyPress={(e) =>
              e.code === "Enter"
                ? e.currentTarget.value !== ""
                  ? sendMessage()
                  : null
                : null
            }
          />
        </div>
      </div>
      <div className="cursor-pointer" onClick={() => sendMessage()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="rounded-full ml-2 shadow-xl bg-yellow-500 lg:py-2 lg:px-2 lg:h-9 lg:w-9 xl:py-3 xl:px-2 xl:h-11 xl:w-11 2xl:h-14 2xl:w-14"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
        </svg>
      </div>
    </div>
  );
};

export default ChatInput;
