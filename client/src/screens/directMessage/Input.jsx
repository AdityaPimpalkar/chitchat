import React from "react";

const Input = ({ message, setMessage, sendMessage }) => {
  return (
    <div className="chatinput w-full bg-purple-600 pt-2 pb-3 position-fixed bottom-0 z-10">
      <div className="flex flex-row pl-4">
        <div className=" flex justify-center items-center">
          <div className="w-full">
            <input
              className="lg:h-9 xl:h-11 2xl:h-14 border-0 bg-purple-600 px-3 w-95 text-black shadow-xl focus:outline-none focus:shadow-xl lg:text-sm 2xl:text-lg"
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
        <div className=" mr-5 cursor-pointer" onClick={() => sendMessage()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="rounded-full shadow-xl bg-yellow-500 lg:py-2 lg:px-2 lg:h-9 lg:w-9 xl:py-3 xl:px-2 xl:h-11 xl:w-11 2xl:h-14 2xl:w-14"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </div>
      </div>
    </div>
    // <div className="mt-auto align-items-end border-info py-3 px-4 border-top d-lg-block chat-input">
    //   <div className="input-group flex-fill">
    //     <input
    //       type="text"
    //       className="form-control"
    //       name="message"
    //       autoComplete="off"
    //       autoCapitalize="on"
    //       value={message}
    //       placeholder="Type your message..."
    //       onChange={({ currentTarget: input }) => setMessage(input.value)}
    //       onKeyPress={(e) =>
    //         e.code === "Enter"
    //           ? e.currentTarget.value !== ""
    //             ? sendMessage()
    //             : null
    //           : null
    //       }
    //     />
    //     <button className="btn btn-info" onClick={() => sendMessage()}>
    //       <i className="fa fa-paper-plane"></i>
    //     </button>
    //   </div>
    // </div>
  );
};

export default Input;
