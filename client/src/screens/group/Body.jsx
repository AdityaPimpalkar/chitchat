import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const Body = ({ user, messages }) => {
  return (
    <div className="position-relative chat-height overflow-auto">
      <ScrollableFeed>
        <div className="d-flex flex-column p-4">
          {messages.map((message, index, messageArr) => {
            return message.type === "joiningStatus" ? (
              <div key={index} className="text-center">
                <span className="badge bg-info">
                  {message.addedBy.userId === user.userId
                    ? `You added ${message.username}`
                    : `${message.addedBy.username} added ${
                        message.userId === user.userId
                          ? "You"
                          : message.username
                      }`}
                </span>
              </div>
            ) : (
              <div
                key={index}
                className={
                  message.from === user.userId
                    ? "chat-message-right pt-2"
                    : "chat-message-left pt-2"
                }
              >
                <div className="flex-shrink-1 bg-light rounded border border-info py-2 px-3 ms-2 me-2">
                  <div className="fw-bold mb-1">
                    {messageArr[index - 1].from === message.from
                      ? message.from === user.userId
                        ? null
                        : null
                      : message.from === user.userId
                      ? "You"
                      : message.username}
                  </div>
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
