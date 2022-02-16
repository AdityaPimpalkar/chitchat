import redis from "../config/ioredis.js";

class MessageStorage {
  saveMessage(message) {}
  findMessagesForUser(userId) {}
  saveGroupMessage(groupId, message) {}
  findGroupMessagesForUser(groupId) {}
}

export class InMemoryMessageStore extends MessageStorage {
  constructor() {
    super();
    this.messages = [];
  }

  saveMessage(message) {
    this.messages.push(message);
  }

  findMessagesForUser(userId) {
    return this.messages.filter(
      ({ from, to }) => from === userId || to === userId
    );
  }
}

export class RedisMessageStorage extends MessageStorage {
  constructor() {
    super();
    this.redisClient = redis;
  }

  async saveMessage(message) {
    const value = JSON.stringify(message);
    return await this.redisClient
      .multi()
      .rpush(`messages:${message.from}`, value)
      .rpush(`messages:${message.to}`, value)
      .exec((error, [[fromError], [toError]]) => {
        if (fromError) throw new Error("Error saving message in sender list");
        if (toError) throw new Error("Error saving message in receipient list");
      })
      .catch((error) => {
        throw error;
      });
  }

  async findMessagesForUser(userId) {
    return await this.redisClient
      .lrange(`messages:${userId}`, 0, -1)
      .then((results) => {
        return {
          result: true,
          error: null,
          data: results.map((res) => JSON.parse(res)),
        };
      })
      .catch((error) => {
        return {
          result: false,
          error: new Error(error),
          data: null,
        };
      });
  }

  async saveGroupMessage(groupId, message) {
    const value = JSON.stringify(message);
    await this.redisClient
      .multi()
      .rpush(`groupMessages:${groupId}`, value)
      .exec();
  }

  async findGroupMessagesForUser(groupId) {
    return await this.redisClient
      .lrange(`groupMessages:${groupId}`, 0, -1)
      .then((results) => {
        return results.map((result) => JSON.parse(result));
      });
  }
}
