import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const Members = ({ users, selectUser }) => {
  return (
    <div className="position-relative chat-height overflow-auto">
      <ScrollableFeed>
        {users.length > 0 &&
          users.map((user, index) => {
            return (
              <div
                key={index}
                className="py-2 px-2 border-info d-lg-block cursor-pointer"
                onClick={() => selectUser(user)}
              >
                <div className="d-flex align-items-center py-1">
                  <div className="d-flex flex-column position-relative">
                    <img
                      src={`https://i.pravatar.cc/3${index + 1}`}
                      className="rounded-circle mx-2"
                      alt={user.username}
                      width="45"
                      height="45"
                    />
                    <span className={user.isSelected ? "isSelected" : ""}>
                      {user.isSelected && <i className="fa fa-check"></i>}
                    </span>
                  </div>
                  <div className="d-flex flex-row position-relative w-100">
                    <strong className="me-auto">{user.username}</strong>
                  </div>
                </div>
              </div>
            );
          })}
      </ScrollableFeed>
    </div>
  );
};

export default Members;
