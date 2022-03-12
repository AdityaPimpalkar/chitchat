import redis from "../config/redis.js";
import { socket } from "../../socket.js";
class GroupStorage {
  saveGroup(socket, group) {}
  getGroupMembers(groupId) {}
  getGroups(sessionId) {}
}

export class RedisGroupStorage extends GroupStorage {
  constructor() {
    super();
    this.redisClient = redis;
  }

  async saveGroup(group, sessions) {
    const { groupId, name, members } = group;
    const { sessionId, userId, username } = socket;

    const joiningMessages = [];
    const groups = [];
    const groupMembers = [...members, { userId, username, isAdmin: true }];
    const groupObj = {
      groupId,
      name,
      members: groupMembers,
    };

    groups.push(["rpush", `group:${sessionId}`, JSON.stringify(groupObj)]);

    members.forEach((member) => {
      const session = sessions.find(
        (session) => session.userId === member.userId
      );

      if (session.sessionId) {
        groups.push([
          "rpush",
          `group:${session.sessionId}`,
          JSON.stringify(groupObj),
        ]);
      }

      const message = {
        type: "joiningStatus",
        userId: member.userId,
        username: member.username,
        addedBy: { userId, username },
      };
      joiningMessages.push([
        "rpush",
        `groupMessages:${groupId}`,
        JSON.stringify(message),
      ]);
    });

    await this.redisClient
      .multi([
        ...groups,
        ...joiningMessages,
        ["rpush", `groupMembers:${groupId}`, JSON.stringify(groupMembers)],
      ])
      .exec();

    return groupObj;
  }

  async getGroupMembers(groupId) {
    return await this.redisClient
      .lrange(`groupMembers:${groupId}`, 0, -1)
      .then(([results]) => {
        return JSON.parse(results);
      });
  }

  async getGroups(sessionId) {
    try {
      return new Promise((resolve, reject) => {
        this.redisClient.lrange(
          `group:${sessionId}`,
          0,
          -1,
          (error, results) => {
            if (error) throw error;
            return resolve({
              result: true,
              error: null,
              data: results.map((result) => JSON.parse(result)),
            });
          }
        );
      });
    } catch (error) {
      return {
        result: false,
        error,
        data: null,
      };
    }
  }
}
