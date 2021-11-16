import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const Body = ({ user, messages }) => {
  return (
    <div className="chatbody lg:chatheight xl:chatheight-xl 2xl:chatheight-2xl overflow-y-auto rounded-t-xl h-4/5 bg-purple-600 text-left ml-2 mr-5">
      <ScrollableFeed>
      {messages.map((message, index) => {
        return (
          <div key={index} className={message.userId === user.userId ? "chatmessage flex flex-row-reverse w-3/5 ml-auto py-2" : "chatmessage flex flex-row w-3/5 mr-auto py-2"}>
            <div className={message.userId === user.userId ? "inline-block mr-2  bg-yellow-500 rounded-lg shadow-xl lg:py-1 px-4 xl:py-3 px-4" : "inline-block ml-2 bg-purple-900 rounded-lg shadow-xl lg:py-1 px-4 xl:py-3 px-4"}>
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
        )
      })}
      </ScrollableFeed>
    </div>
      
      
    // <div className="position-relative chat-height overflow-auto">
    //   <ScrollableFeed>
    //     <div className="d-flex flex-column p-4">
    //       {messages.map((message, index) => {
    //         return (
    //           <div
    //             key={index}
    //             className={
    //               message.userId === user.userId
    //                 ? "chat-message-right pt-2"
    //                 : "chat-message-left pt-2"
    //             }
    //           >
    //             <div className="d-flex flex-column align-items-center justify-content-center"></div>
    //             <div className="flex-shrink-1 bg-light rounded border border-info py-2 px-3 ms-2 me-2">
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
