import React, { Component } from "react";
import ScrollableFeed from "react-scrollable-feed";
import Name from "./../screens/newGroup/Name";
import Members from "./../screens/newGroup/Members";
import Actions from "./../screens/newGroup/Actions";

class NewGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        members: [],
      },
      users: this.props.users,
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
    const { name, members } = this.state.data;
    const { users } = this.state;
    return (
      <div className="h-100 overflow-y-auto rounded-xl h-4/5 bg-purple-600 text-left ml-2 mr-5 mt-2 pb-2">
        <Name name={name} setName={this.setName}>
          <Actions
            name={name}
            members={members}
            cancel={this.cancel}
            createGroup={this.createGroup}
          />
        </Name>
        <Members selectUser={this.selectUser} users={users} />
      </div>
    );
  }
}

export default NewGroup;
