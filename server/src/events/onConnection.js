import { getUsers, getGroups, getFriendRequests } from "../tasks/connection.js";
import socketEvents from "../config/socketEvents.js";
import { socket } from "../../socket.js";

export default async function onConnectionEvents() {
  try {
    const [users, groups, friendRequests] = await Promise.all([
      getUsers(socket.userId),
      getGroups(socket.sessionId),
      getFriendRequests(socket.userId),
    ]);
    //all users event
    socket.emit(socketEvents.LOAD_DATA, { users, groups, friendRequests });

    //connected user details event
    socket.emit(socketEvents.SESSION, {
      ...socket.user,
      token: socket.token,
    });

    //new user event
    socket.broadcast.emit(socketEvents.USER_CONNECTED, socket.user);
  } catch (error) {
    socket.emit(socketEvents.SERVER_ERROR, error.message);
  }
}
