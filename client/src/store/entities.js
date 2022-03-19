import { combineReducers } from "redux";
import chatsReducer from "./entities/conversations.js";

export default combineReducers({
  chats: chatsReducer,
});
