import { socket } from "../../socket.js";
import {
  newGroup,
  groupMessage,
  groupMessages,
} from "../tasks/groupMessage.js";

export default function groupMessageEvents() {
  socket.on("new group", async (group) => await newGroup(group));

  socket.on("group message", async (group) => await groupMessage(group));

  socket.on("group messages", async (groupId) => await groupMessages(groupId));
}
