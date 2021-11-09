import React from "react";

const Actions = ({ name, members, cancel, createGroup }) => {
  return (
    <div className="mt-auto align-items-end border-info py-2 px-3 border-top d-lg-block chat-input">
      <div className="d-flex flex-row-reverse">
        <button className="btn btn-danger m-1" onClick={() => cancel()}>
          Cancel <i className="fa fa-close"></i>
        </button>
        <button
          className="btn btn-success m-1"
          onClick={() => createGroup()}
          disabled={name === "" || members.length === 0}
        >
          Create <i className="fa fa-check"></i>
        </button>
      </div>
    </div>
  );
};

export default Actions;
