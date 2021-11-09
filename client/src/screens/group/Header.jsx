import React from "react";

const Header = ({ group, user }) => {
  return (
    <div className="align-items-start px-1 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
      <div className="d-flex align-items-center py-2">
        <div className="position-relative">
          <img
            src="https://i.pravatar.cc/300"
            className="rounded-circle mx-2"
            alt={user.username}
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
        </div>
      </div>
    </div>
  );
};

export default Header;
