import { socket } from "../../socket.js";
import {
  newGroup,
  groupMessage as getgroupMessage,
  groupMessages,
} from "../tasks/groupMessage.js";

export default function groupMessage() {
  socket.on("new group", async (group) => await newGroup(group));

  socket.on("group message", async (group) => await getgroupMessage(group));

  socket.on("group messages", async (groupId) => await groupMessages(groupId));
}
