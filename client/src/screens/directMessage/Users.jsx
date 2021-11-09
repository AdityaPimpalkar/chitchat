import React from "react";

const Users = ({ user, users, selectUser, toggleNewGroup }) => {
  return (
    <div className="d-flex flex-column col-3 col-lg-3 col-xl-3 p-0 border-right-info">
      <div className="align-items-start py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
        <div className="d-flex align-items-center py-1">
          <div className="position-relative">
            <img
              src="https://i.pravatar.cc/300"
              className="rounded-circle mx-2"
              alt={user.username}
              width="40"
              height="40"
            />
          </div>
          <div className="flex-grow-1">{user.username}</div>
          <span
            className="px-2 cursor-pointer text-info"
            onClick={() => toggleNewGroup(true)}
          >
            <i className="fa fa-plus-circle fa-lg"></i>
          </span>
        </div>
      </div>
      {users.length > 0 ? (
        users.map((user, index) => {
          return (
            <div
              key={index}
              className="py-2 px-2 border-bottom border-info d-lg-block cursor-pointer"
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
                  <span
                    className={user.connected ? "online" : "offline"}
                  ></span>
                </div>
                <div className="d-flex flex-row position-relative w-100">
                  <strong className="me-auto">{user.username}</strong>
                  <span
                    className={
                      user.hasNewMessage ? "new-message-alert mt-2" : ""
                    }
                  ></span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="d-flex justify-content-center align-items-center chat-window">
          No Users Connected
        </div>
      )}
    </div>
  );
};

export default Users;
