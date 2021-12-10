import React from "react";
import ScrollableFeed from "react-scrollable-feed";

const Members = ({ users, selectUser }) => {
  return (
    <div className="flex flex-row">
      <div className="w-100 chatbody lg:chatheight xl:chatheight-xl 2xl:chatheight-2xl overflow-y-auto">
        <ScrollableFeed>
          {users.length > 0 &&
            users.map((user, index) => {
              return (
                <div
                  key={index}
                  className="px-2 cursor-pointer"
                  onClick={() => selectUser()}
                >
                  <div className="flex flex-row align-items-center py-1">
                    <div className="d-flex flex-column position-relative">
                      <img
                        src={user.image}
                        className="mx-2 rounded-full border-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
                        alt={user.username}
                        width="45"
                        height="45"
                      />
                      <span className={user.isSelected ? "isSelected" : ""}>
                        {user.isSelected && <i className="fa fa-check"></i>}
                      </span>
                    </div>
                    <div className="d-flex flex-row position-relative ">
                      <strong className="italic me-auto">
                        {user.username}
                      </strong>
                    </div>
                  </div>
                </div>
              );
            })}
        </ScrollableFeed>
      </div>
    </div>
  );
};

export default Members;
