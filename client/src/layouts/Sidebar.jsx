import React from "react";

const Sidebar = (props) => {
  return (
    <div className="w-30 flex flex-col bg-gray-100 bg-purple-900">
      {props.children}
    </div>
  );
};

export default Sidebar;
