import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const Body = ({ user, messages }) => {
  return (
    <div className="chatbody lg:chatheight xl:chatheight-xl 2xl:chatheight-2xl overflow-y-auto rounded-t-xl h-4/5 bg-purple-600 text-left ml-2 mr-5">
      <ScrollableFeed>
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
              className={
                message.userId === user.userId
                  ? "chatmessage flex flex-row-reverse w-3/5 ml-auto py-2"
                  : "chatmessage flex flex-row w-3/5 mr-auto py-2"
              }
            >
              <div
                className={
                  message.userId === user.userId
                    ? "inline-block mr-2  bg-yellow-500 rounded-lg shadow-xl lg:py-1 px-4 xl:py-3 px-4"
                    : "inline-block ml-2 bg-purple-900 rounded-lg shadow-xl lg:py-1 px-4 xl:py-3 px-4"
                }
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
      </ScrollableFeed>
    </div>
    // <div className="position-relative chat-height overflow-auto">
    //   <ScrollableFeed>
    //     <div className="d-flex flex-column p-4">
    //       {messages.map((message, index, messageArr) => {
    //         return message.type === "joiningStatus" ? (
    //           <div key={index} className="text-center">
    //             <span className="badge bg-info">
    //               {message.addedBy.userId === user.userId
    //                 ? `You added ${message.username}`
    //                 : `${message.addedBy.username} added ${
    //                     message.userId === user.userId
    //                       ? "You"
    //                       : message.username
    //                   }`}
    //             </span>
    //           </div>
    //         ) : (
    //           <div
    //             key={index}
    //             className={
    //               message.from === user.userId
    //                 ? "chat-message-right pt-2"
    //                 : "chat-message-left pt-2"
    //             }
    //           >
    //             <div className="flex-shrink-1 bg-light rounded border border-info py-2 px-3 ms-2 me-2">
    //               <div className="fw-bold mb-1">
    //                 {messageArr[index - 1].from === message.from
    //                   ? message.from === user.userId
    //                     ? null
    //                     : null
    //                   : message.from === user.userId
    //                   ? "You"
    //                   : message.username}
    //               </div>
    //               {message.message}
    //               <div className="text-muted small text-nowrap mt-2">
    //                 12:00 AM
    //               </div>
    //             </div>
    //           </div>
    //         );
    //       })}
    //     </div>
    //   </ScrollableFeed>
    // </div>
  );
};

export default Body;
