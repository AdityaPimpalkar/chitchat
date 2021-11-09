import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const Body = ({ user, messages }) => {
  return (
    <div className="position-relative chat-height overflow-auto">
      <ScrollableFeed>
        <div className="d-flex flex-column p-4">
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className={
                  message.userId === user.userId
                    ? "chat-message-right pt-2"
                    : "chat-message-left pt-2"
                }
              >
                <div className="d-flex flex-column align-items-center justify-content-center"></div>
                <div className="flex-shrink-1 bg-light rounded border border-info py-2 px-3 ms-2 me-2">
                  {message.message}
                  <div className="text-muted small text-nowrap mt-2">
                    12:00 AM
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollableFeed>
    </div>
  );
};

export default Body;
