import {
  newGroup,
  groupMessage,
  groupMessages,
} from "../tasks/groupMessage.js";

export default function groupMessageEvents(socket) {
  socket.on("new group", (group) => newGroup(socket, group));

  socket.on("group message", (group) => groupMessage(socket, group));

  socket.on("group messages", (groupId) => groupMessages(socket, groupId));
}
