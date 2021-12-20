import React from "react";

const Name = ({ name, setName, ...props }) => {
  return (
    <React.Fragment>
      <div className="chatheader w-full py-2 pl-1 pr-5">
        <div className="lg:p-1 rounded-full bg-purple-600 items-center shadow-lg">
          <div className="flex flex-row text-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="border-2 rounded-full mr-2 p-1 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            <div className="flex flex-col w-4/5">
              <input
                className="lg:h-9 xl:h-11 2xl:h-14 border-0 w-full bg-purple-600 my-auto focus:outline-none lg:text-sm xl:text-base 2xl:text-lg"
                placeholder="Enter group name..."
                name="name"
                autoComplete="off"
                autoCapitalize="on"
                value={name}
                onChange={({ currentTarget: input }) => setName(input.value)}
                onKeyPress={(e) =>
                  e.code === "Enter"
                    ? e.currentTarget.value !== ""
                      ? setName()
                      : null
                    : null
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row text-left bg-purple-700 shadow-xl">
        <div className="flex flex-col w-4/5"></div>
        {props.children}
      </div>
      {/* <div className="mt-3 mx-3">
        <span className=" text-semibold lg:text-base xl:text-lg 2xl:text-xl">
          Select Group Members
        </span>
      </div>
      <hr className="m-2" /> */}
    </React.Fragment>
    // <div className="py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
    //   <label className="form-control-label">Group Name</label>
    //   <div className="input-group flex-fill">
    //     <input
    //       type="text"
    //       className="form-control"
    //       name="name"
    //       autoComplete="off"
    //       autoCapitalize="on"
    //       value={name}
    //       placeholder="Type a group name..."
    //       onChange={({ currentTarget: input }) => setName(input.value)}
    //     />
    //   </div>
    // </div>
  );
};

export default Name;
