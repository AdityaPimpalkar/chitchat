import redis from "../config/ioredis.js";

class FindFriends {
  AddFriend(from, to) {}
  searchFriend(email) {}
  getFriendRequests(userId) {}
  getSentRequests(userId) {}
  AcceptFriendRequest(from, to) {}
  getConversations(userId) {}
}

export class RedisFriendStorage extends FindFriends {
  constructor() {
    super();
    this.redisClient = redis;
  }

  async AddFriend(fromObj, toObj) {
    const from = JSON.stringify({
      username: fromObj.username,
      userId: fromObj.userId,
      sessionId: fromObj.sessionId,
      email: fromObj.email,
      image: fromObj.image,
    });
    const to = JSON.stringify({
      username: toObj.username,
      userId: toObj.userId,
      sessionId: toObj.sessionId,
      email: toObj.email,
      image: toObj.image,
    });
    await this.redisClient
      .multi()
      .rpush(`sentRequest:${fromObj.userId}`, to)
      .rpush(`receivedRequest:${toObj.userId}`, from)
      .exec()
      .catch((results) => console.log(results));
  }

  async searchFriend(email) {
    return await this.redisClient
      .multi()
      .hget(`user:${email}`, "user")
      .exec()
      .then(([[err, result]]) => {
        if (err) throw new Error("Error searching a friend.");
        return {
          result: true,
          error: null,
          data: JSON.parse(result),
        };
      })
      .catch((error) => {
        return {
          result: false,
          error,
          data: null,
        };
      });
  }

  async getFriendRequests(userId) {
    return await this.redisClient
      .lrange(`receivedRequest:${userId}`, 0, -1)
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

  async getSentRequests(userId) {
    return await this.redisClient
      .lrange(`sentRequest:${userId}`, 0, -1)
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

  async AcceptFriendRequest(fromObj, toObj) {
    const from = JSON.stringify({
      username: fromObj.username,
      userId: fromObj.userId,
      sessionId: fromObj.sessionId,
      email: fromObj.email,
      image: fromObj.image,
    });
    const to = JSON.stringify({
      username: toObj.username,
      userId: toObj.userId,
      sessionId: toObj.sessionId,
      email: toObj.email,
      image: toObj.image,
    });
    await this.redisClient
      .multi()
      .lrem(`sentRequest:${toObj.userId}`, 0, from)
      .lrem(`receivedRequest:${fromObj.userId}`, 0, to)
      .rpush(`conversation:${fromObj.userId}`, to)
      .rpush(`conversation:${toObj.userId}`, from)
      .exec()
      .then((result) => console.log(result))
      .catch((results) => console.log(results));
  }

  async getConversations(userId) {
    return await this.redisClient
      .multi()
      .lrange(`conversation:${userId}`, 0, -1)
      .exec()
      .then(([[errors, results]]) => {
        if (errors) new Error("Error retreiving conversations.");
        return {
          result: true,
          error: null,
          data: results.map((result) => JSON.parse(result)),
        };
      })
      .catch((error) => {
        return {
          result: false,
          error,
          data: null,
        };
      });
  }
}
