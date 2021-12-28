import React from "react";

const Content = (props) => {
  return <div className="w-70 flex flex-1 flex-col">{props.children}</div>;
};

export default Content;
