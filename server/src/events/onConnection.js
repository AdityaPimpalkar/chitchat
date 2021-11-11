import { connect, getUsers, getGroups } from "../tasks/connection.js";

export default async function onConnectionEvents(socket) {
  connect(socket);

  const [users, groups] = await Promise.all([
    getUsers(socket.userId),
    getGroups(socket.sessionId),
  ]);

  //all users event
  socket.emit("users", { users, groups });

  //connected user details event
  console.log(socket.user);
  socket.emit("session", {
    ...socket.user,
    token: socket.token
  });

  //new user event
  socket.broadcast.emit("user connected", socket.user);
}
