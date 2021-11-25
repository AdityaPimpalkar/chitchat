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

  AddFriend(fromObj, toObj) {
    const from = JSON.stringify(from);
    const to = JSON.stringify(to);
    await this.redisClient
      .multi()
      .rpush(`sentRequest:${fromObj.userId}`, to)
      .rpush(`receivedRequest:${toObj.userId}`, from)
      .exec();
  }

  searchFriend(email) {
    return await this.redisClient
      .multi()
      .hget(`user:${email}`, "user")
      .exec()
      .then(([[err, result]]) => {
        return JSON.parse(result);
      })
      .catch((error) => console.log(error));
  }

  getFriendRequests(userId) {
    return await this.redisClient
      .lrange(`receivedRequest:${userId}`, 0, -1)
      .then((results) => {
        return results.map((res) => JSON.parse(res));
      });
  }

  getSentRequests(userId) {
    return await this.redisClient
      .lrange(`sentRequest:${userId}`, 0, -1)
      .then((results) => {
        return results.map((res) => JSON.parse(res));
      });
  }

  AcceptFriendRequest(fromObj, toObj) {
    const from = JSON.stringify(from);
    const to = JSON.stringify(to);
    await this.redisClient
      .multi()
      .rpush(`conversation:${fromObj.userId}`, to)
      .rpush(`conversation:${toObj.userId}`, from)
      .exec();
  }
}
