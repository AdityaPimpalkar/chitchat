import { socket } from "../../socket.js";
import {
  newGroup,
  groupMessage,
  groupMessages,
} from "../tasks/groupMessage.js";

export default function groupMessageEvents() {
  socket.on("new group", (group) => newGroup(group));

  socket.on("group message", (group) => groupMessage(group));

  socket.on("group messages", (groupId) => groupMessages(groupId));
}
