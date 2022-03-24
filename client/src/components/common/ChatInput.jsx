import React, { useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useSelector } from "react-redux";

const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const [emojiPicker, setEmojiPicker] = useState(false);
  const isConnected = useSelector((state) => state.auth.connected);

  const onChangeInput = (value) => {
    setMessage(value);
  };

  const addEmoji = (emoji) => {
    setMessage(`${message}${emoji}`);
  };

  const onEnter = (value) => {
    setMessage("");
    sendMessage(value);
  };

  return (
    <React.Fragment>
      <div className="flex">
        <div className="flex flex-row w-full bg-purple-900 p-2">
          <EmojiHappyIcon
            className="cursor-pointer mr-2 rounded-full lg:py-2 lg:px-2 lg:h-9 lg:w-9 xl:py-3 xl:px-2 xl:h-11 xl:w-11 2xl:h-14 2xl:w-14"
            onClick={() =>
              isConnected ? setEmojiPicker(emojiPicker ? false : true) : null
            }
          />
          <div className="flex justify-center items-center w-full">
            <div className="flex flex-1">
              <input
                className="flex flex-1 rounded-lg lg:h-9 xl:h-11 2xl:h-14 border-0 bg-purple-700 px-3 text-white shadow-xl focus:outline-none focus:shadow-xl lg:text-sm 2xl:text-lg"
                placeholder="Type your message..."
                name="message"
                autoComplete="off"
                autoCapitalize="on"
                value={message}
                disabled={isConnected ? false : true}
                onChange={({ currentTarget: input }) =>
                  onChangeInput(input.value)
                }
                onKeyPress={(e) =>
                  e.code === "Enter"
                    ? e.currentTarget.value !== ""
                      ? isConnected
                        ? onEnter(e.currentTarget.value)
                        : null
                      : null
                    : null
                }
              />
            </div>
          </div>
          <button
            disabled={isConnected ? false : true}
            className={isConnected ? "" : "cursor-not-allowed"}
            onClick={() => sendMessage(message)}
          >
            <PaperAirplaneIcon className="rounded-full ml-2 shadow-xl bg-yellow-500 lg:py-2 lg:px-2 lg:h-9 lg:w-9 xl:py-3 xl:px-2 xl:h-11 xl:w-11 2xl:h-14 2xl:w-14" />
          </button>
        </div>
      </div>
      {emojiPicker && (
        <div className="flex rounded-xl">
          <Picker
            set="apple"
            theme="dark"
            onSelect={(emoji) => addEmoji(emoji.native)}
            style={{ width: "100%" }}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default ChatInput;
