const socketEvents = {
  CONNECT: "connect",
  DISCONNECT: "disconnect",
  CONNECT_ERROR: "connect_error",
  SERVER_ERROR: "server_error",
  SESSION: "session",
  LOAD_DATA: "load_data",
  SEARCH_FRIEND: "search_friend",
  ADD_FRIEND: "add_friend",
  ACCEPT_REQUEST: "accept_request",
  NEW_REQUEST: "new_request",
  NEW_FRIEND: "new_friend",
  USER_CONNECTED: "user_connected",
  USER_DISCONNECTED: "user_disconnected",
  PRIVATE_MESSAGE: "private_message",
  USER_MESSAGES: "user_messages",
};
export default socketEvents;
