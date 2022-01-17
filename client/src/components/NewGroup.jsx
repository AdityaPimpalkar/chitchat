import React, { Component } from "react";
import { XIcon, CheckIcon } from "@heroicons/react/solid";

class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        members: [],
      },
      users: this.props.users || [],
    };
  }

  setName = (name) => {
    const data = { ...this.state.data };
    data.name = name;
    this.setState({ data });
  };

  selectUser = (selectedUser) => {
    const users = [...this.state.users];
    const data = { ...this.state.data };
    const userIndex = users.findIndex(
      (user) => user.userId === selectedUser.userId
    );
    const user = users[userIndex];
    const isSelected = user.isSelected;
    if (isSelected) {
      user.isSelected = false;
      const members = data.members.filter(
        (member) => member.userId !== user.userId
      );
      data.members = members;
    } else {
      user.isSelected = true;
      data.members.push(user);
    }
    this.setState({ data });
    this.setState({ users });
  };

  cancel = () => {
    this.props.toggleNewGroup(false);
  };

  createGroup = () => {
    const data = { ...this.state.data };
    const users = [...this.state.users];
    this.props.createGroup(data);
    data.name = "";
    data.members = [];
    users.map((user) => delete user.isSelected);
    this.setState({ data, users });
  };
  render() {
    return (
      <React.Fragment>
        <div className="flex">
          <div className="flex flex-row justify-start items-center w-full bg-purple-900 lg:h-12 xl:h-16 2xl:h-20">
            <div className="bg-purple-900">
              <div className="flex flex-row text-left">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="border-2 rounded-full mx-2 lg:h-9 lg:w-9 xl:h-12 xl:w-12 2xl:h-14 2xl:w-14"
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
                    className="lg:h-9 xl:h-11 2xl:h-14 border-0 w-full bg-purple-900 my-auto focus:outline-none lg:text-sm xl:text-base 2xl:text-lg"
                    placeholder="Enter group name..."
                    name="name"
                    autoComplete="off"
                    autoCapitalize="on"
                    value={this.state.data.name}
                    onChange={({ currentTarget: input }) =>
                      this.setName(input.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-3 px-3 bg-purple-900">
          <span className="text-semibold lg:text-base xl:text-lg 2xl:text-xl">
            - Select Group Members -
          </span>
        </div>
        <div className="flex h-full flex-1 overflow-y-auto paragraph">
          <div className="flex flex-row overflow-y-auto w-full bg-purple-900">
            <div className="w-full">
              {this.state.users.length > 0 ? (
                this.state.users.map((user, index) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-row cursor-pointer w-full lg:py-1 pr-2 xl:py-2"
                      onClick={() => this.selectUser(user)}
                    >
                      <div className="flex flex-col justify-center items-center">
                        <div className="d-flex flex-column relative">
                          <img
                            src={user.image}
                            className="rounded-full border-2 lg:mx-2 xl:mx-2 2xl:mx-4 lg:h-11 lg:w-11 xl:h-12 xl:w-12 2xl:h-16 2xl:w-16"
                            alt="user"
                          />
                          {user.isSelected && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="isSelected h-5 w-5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col flex-1 justify-center items-center lg:w-80">
                        <div className="flex flex-row w-full">
                          <div className="flex flex-col border-purple-400 flex-shrink w-3/4">
                            <span className="text-left italic truncate lg:text-sm lg:font-medium xl:text-base xl:font-semibold 2xl:text-xl 2xl:font-semibold">
                              {user.username}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="d-flex h-100 text-center">No members found</div>
              )}
            </div>
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-row w-full bg-purple-800 p-2">
            <div className="flex justify-center items-center w-full">
              <div className="flex flex-1 ">
                <span className="text-red-300 ml-auto">
                  {this.state.data.name === ""
                    ? "Please enter a group name. "
                    : ""}
                  {this.state.data.members.length === 0
                    ? "Please select member(s)."
                    : ""}
                </span>
              </div>
            </div>
            <button
              disabled={
                this.state.data.name !== "" &&
                this.state.data.members.length !== 0
                  ? false
                  : true
              }
              className={
                this.state.data.name !== "" &&
                this.state.data.members.length !== 0
                  ? ""
                  : "cursor-not-allowed"
              }
              onClick={() => this.cancel()}
            >
              <CheckIcon className="rounded-full ml-2 shadow-xl bg-yellow-500 lg:py-2 lg:px-2 lg:h-9 lg:w-9 xl:py-3 xl:px-2 xl:h-11 xl:w-11 2xl:h-14 2xl:w-14" />
            </button>
            <button onClick={() => this.cancel()}>
              <XIcon className="rounded-full ml-2 shadow-xl bg-red-500 lg:py-2 lg:px-2 lg:h-9 lg:w-9 xl:py-3 xl:px-2 xl:h-11 xl:w-11 2xl:h-14 2xl:w-14" />
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewGroup;
