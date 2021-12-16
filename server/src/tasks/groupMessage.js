import { v4 as uuidv4 } from "uuid";
import { socket } from "../../socket.js";
import { RedisGroupStorage } from "../services/group.js";
import { RedisSessionStorage } from "../services/session.js";
import { RedisMessageStorage } from "../services/message.js";

const sessionStorage = new RedisSessionStorage();
const groupStorage = new RedisGroupStorage();
const messageStorage = new RedisMessageStorage();

export async function newGroup({ name, members }) {
  const groupId = uuidv4();
  const group = { groupId, name, members };
  const sessions = await sessionStorage.findUserSession(members);

  const groupObj = await groupStorage.saveGroup(group, sessions);

  socket.emit("group created", groupObj);

  members.forEach((member) => {
    socket.to(member.userId).emit("new group", groupObj);
  });

  await groupMessages(groupId);
}

export async function groupMessage({ groupId, message }) {
  const groupMembers = await groupStorage.getGroupMembers(groupId);
  groupMembers.forEach((member) => {
    socket.to(member.userId).emit("group message", { groupId, message });
  });
  await messageStorage.saveGroupMessage(groupId, message);
}

export async function groupMessages(groupId) {
  const groupMessages = await messageStorage.findGroupMessagesForUser(groupId);
  socket.emit("group messages", groupMessages);
}
