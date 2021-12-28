import React from "react";

const Container = (props) => {
  return (
    <main className="flex flex-col h-screen hidden md:hidden lg:flex xl:flex 2x:flex">
      <div className="flex flex-1 text-white overflow-hidden">
        {props.children}
      </div>
    </main>
  );
};

export default Container;
