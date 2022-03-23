import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import socket from "../../www/socket";
import SocketEvents from "../../events/constants";
import { messageSeen } from "../../store/entities/conversations";
import { chatSelected } from "../../store/entity";
import { navigatedToChats } from "../../store/navigation";
import Entity from "../common/Entity";
import Search from "../common/Search";

const Conversations = () => {
  const chats = useSelector((state) => state.entities.chats);
  const [searchedChats, setSearchedChats] = useState([]);
  const [searchResults, setsearchResults] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {};
  }, [chats]);

  const onSearch = (value) => {
    setsearchResults(true);
    const searchedUsers = chats.filter(
      (chat) => chat.username.toLowerCase() === value
    );
    setSearchedChats(searchedUsers || []);
  };

  const isClear = () => {
    setsearchResults(false);
    setSearchedChats([]);
  };

  const selectUser = (user) => {
    dispatch(navigatedToChats());
    dispatch(chatSelected(user));
    socket.emit(SocketEvents.USER_MESSAGES, user);
    dispatch(messageSeen(user.userId));
  };

  const RenderUsers = ({ users }) => {
    return users.length > 0 ? (
      users.map((user, index) => (
        <Entity
          key={index}
          entity={user}
          image={user.image}
          selectEntity={(entity) => selectUser(entity)}
          title={user.username}
          SubTitle={
            <React.Fragment>
              {user.lastMessage?.content ? (
                user.lastMessage.content
              ) : (
                <span className="italic">No message</span>
              )}
            </React.Fragment>
          }
          Options={
            <React.Fragment>
              <span className="my-1 mx-2 lg:text-xxs truncate xl:text-xs 2xl:text-sm">
                {user.lastMessage?.sentOn &&
                  new Date(user.lastMessage.sentOn).toLocaleString("en-IN", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}
              </span>
              {user.hasNewMessage && (
                <span className="lg:h-2 lg:w-2 xl:h-3 lg:w-3 2xl:h-4 2xl:w-4 rounded-full bg-yellow-500 ">
                  <span className="lg:text-xs xl:text-sm 2xl:text-base font-semibold"></span>
                </span>
              )}
            </React.Fragment>
          }
        />
      ))
    ) : (
      <div className="flex h-full items-center justify-center">
        No users added
      </div>
    );
  };

  return (
    <React.Fragment>
      <Search
        onKeyPress={(value) => onSearch(value)}
        isClear={() => isClear()}
      />
      <div className="flex flex-row flex-1 overflow-y-auto w-full ">
        <div className="w-full h-full">
          {searchResults === true &&
            (searchedChats.length > 0 ? (
              <RenderUsers users={searchedChats} />
            ) : (
              <div className="flex h-full text-center items-center justify-center">
                No users found!
              </div>
            ))}
          {searchResults === false && <RenderUsers users={chats} />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Conversations;
