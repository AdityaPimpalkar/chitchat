import redis from "../config/ioredis.js";

class FindFriends {
  AddFriend(from, to) {}
  searchFriend(email) {}
  getFriendRequests(userId) {}
  getSentRequests(userId) {}
  AcceptFriendRequest(from, to) {}
}

export class RedisFriendStorage extends FindFriends {
  constructor() {
    super();
    this.redisClient = redis;
  }

  async AddFriend(fromObj, toObj) {
    const from = JSON.stringify(fromObj);
    const to = JSON.stringify(toObj);
    await this.redisClient
      .multi()
      .rpush(`sentRequest:${fromObj.userId}`, to)
      .rpush(`receivedRequest:${toObj.userId}`, from)
      .exec();
  }

  async searchFriend(email) {
    return await this.redisClient
      .multi()
      .hget(`user:${email}`, "user")
      .exec()
      .then(([[err, result]]) => {
        return JSON.parse(result);
      })
      .catch((error) => console.log(error));
  }

  async getFriendRequests(userId) {
    return await this.redisClient
      .lrange(`receivedRequest:${userId}`, 0, -1)
      .then((results) => {
        return results.map((res) => JSON.parse(res));
      });
  }

  async getSentRequests(userId) {
    return await this.redisClient
      .lrange(`sentRequest:${userId}`, 0, -1)
      .then((results) => {
        return results.map((res) => JSON.parse(res));
      });
  }

  async AcceptFriendRequest(fromObj, toObj) {
    const from = JSON.stringify(fromObj);
    const to = JSON.stringify(toObj);
    await this.redisClient
      .multi()
      .lrem(`sentRequest:${fromObj.userId}`, to)
      .lrem(`receivedRequest:${toObj.userId}`, from)
      .rpush(`conversation:${fromObj.userId}`, to)
      .rpush(`conversation:${toObj.userId}`, from)
      .exec()
      .then((result) => console.log(result));
  }
}
