import { combineReducers } from "redux";
import chatsReducer from "./entities/conversations.js";
import requestsReducer from "./entities/requests.js";

export default combineReducers({
  chats: chatsReducer,
  requests: requestsReducer,
});
