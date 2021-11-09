import React from "react";

const Input = ({ message, setMessage, sendGroupMessage }) => {
  return (
    <div className="mt-auto align-items-end border-info py-3 px-4 border-top d-lg-block chat-input">
      <div className="input-group flex-fill">
        <input
          type="text"
          className="form-control"
          name="message"
          autoComplete="off"
          autoCapitalize="on"
          value={message}
          placeholder="Type your message..."
          onChange={({ currentTarget: input }) => setMessage(input.value)}
          onKeyPress={(e) =>
            e.code === "Enter"
              ? e.currentTarget.value !== ""
                ? sendGroupMessage()
                : null
              : null
          }
        />
        <button
          className="btn btn-info"
          onClick={() => message !== "" && sendGroupMessage()}
          disabled={message === ""}
        >
          <i className="fa fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default Input;
