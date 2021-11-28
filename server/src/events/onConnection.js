import {
  connect,
  getUsers,
  getGroups,
  getFriendRequests,
} from "../tasks/connection.js";

export default async function onConnectionEvents(socket) {
  connect(socket);

  const [users, groups, friendRequests] = await Promise.all([
    getUsers(socket.userId),
    getGroups(socket.sessionId),
    getFriendRequests(socket.userId),
  ]);

  //all users event
  socket.emit("users", { users, groups, friendRequests });

  //connected user details event
  console.log(socket.user);
  socket.emit("session", {
    ...socket.user,
    token: socket.token,
  });

  //new user event
  socket.broadcast.emit("user connected", socket.user);
}
