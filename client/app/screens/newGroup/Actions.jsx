import React from "react";

const Actions = ({ name, members, cancel, createGroup }) => {
  let btnDisabled = name === "" || members.length === 0;
  return (
    <React.Fragment>
      <div className="chatinput bg-purple-600 rounded-b-xl ml-2 mr-5 pt-2 pb-3">
        <div className="flex flex-row pl-4">
          <div className="flex flex-col ml-auto my-auto mr-4">
            <span className="text-red-300">
              {name === "" ? "Please enter a group name. " : ""}
              {members.length === 0 ? "Please select member(s)." : ""}
            </span>
          </div>
          <div className="flex flex-col mr-2">
            <button
              className={`ml-1 w-5 xl:ml-1 my-auto ${
                btnDisabled ? "cursor-not-allowed" : ""
              }`}
              onClick={() => createGroup()}
              disabled={btnDisabled}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="rounded-full shadow-xl bg-yellow-500 lg:py-2 lg:px-2 lg:h-9 lg:w-9 xl:py-3 xl:px-2 xl:h-11 xl:w-11 2xl:h-14 2xl:w-14"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-col mr-2">
            <button
              className="ml-1 w-5 xl:ml-1 cursor-pointer my-auto"
              onClick={() => cancel()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="rounded-full shadow-xl bg-red-500 lg:py-2 lg:px-2 lg:h-9 lg:w-9 xl:py-3 xl:px-2 xl:h-11 xl:w-11 2xl:h-14 2xl:w-14"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Actions;
