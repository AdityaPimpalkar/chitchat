import React from "react";

const Name = ({ name, setName }) => {
  return (
    <div className="py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
      <label className="form-control-label">Group Name</label>
      <div className="input-group flex-fill">
        <input
          type="text"
          className="form-control"
          name="name"
          autoComplete="off"
          autoCapitalize="on"
          value={name}
          placeholder="Type a group name..."
          onChange={({ currentTarget: input }) => setName(input.value)}
        />
      </div>
    </div>
  );
};

export default Name;
