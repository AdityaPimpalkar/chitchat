import React from "react";

const Groups = ({ user, groups, selectGroup }) => {
  return (
    <div className="d-flex flex-column col-3 col-lg-3 col-xl-3 p-0 border-left-info">
      {groups.length > 0 ? (
        groups.map((group, index) => {
          return (
            <div
              key={index}
              className="py-1 px-1 border-bottom border-info w-100 cursor-pointer"
              onClick={() => selectGroup(group)}
            >
              <div className="d-flex align-items-center py-1">
                <div className="position-relative">
                  <img
                    src="https://i.pravatar.cc/300"
                    className="rounded-circle mx-2"
                    alt=""
                    width="40"
                    height="40"
                  />
                </div>
                <div className="d-flex flex-row position-relative w-100">
                  <div className="d-flex flex-column me-auto">
                    <strong>{group.name}</strong>
                    <span>
                      {group.members.map(
                        (member, index) =>
                          member.userId !== user.userId && (
                            <span key={index}> {member.username}, </span>
                          )
                      )}
                      You
                    </span>
                  </div>

                  <span
                    className={
                      group.hasNewMessage ? "new-message-alert mt-2" : ""
                    }
                  ></span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="d-flex justify-content-center align-items-center chat-window">
          No Groups Found
        </div>
      )}
    </div>
  );
};

export default Groups;
