import { getUsers, getGroups, getFriendRequests } from "../tasks/connection.js";
import { socket } from "../../socket.js";

export default async function onConnectionEvents() {
  try {
    const [users, groups, friendRequests] = await Promise.all([
      getUsers(socket.userId),
      getGroups(socket.sessionId),
      getFriendRequests(socket.userId),
    ]);
    //all users event
    socket.emit("users", { users, groups, friendRequests });

    //connected user details event
    socket.emit("session", {
      ...socket.user,
      token: socket.token,
    });

    //new user event
    socket.broadcast.emit("user connected", socket.user);
  } catch (error) {
    socket.emit("server_error", error.message);
  }
}
