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
  socket.emit("session", {
    sessionId: socket.sessionId,
    userId: socket.userId,
    username: socket.username,
  });

  //new user event
  socket.broadcast.emit("user connected", {
    userId: socket.userId,
    username: socket.username,
  });
}
