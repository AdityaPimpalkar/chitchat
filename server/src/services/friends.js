import redis from "../config/redis.js";

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
    try {
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
      return new Promise((resolve, reject) => {
        const result = this.redisClient
          .multi()
          .rpush(`sentRequest:${fromObj.userId}`, to)
          .rpush(`receivedRequest:${toObj.userId}`, from)
          .exec((result) => {
            console.log("AddFriend results", result);
          });
        if (result) resolve(result);
        else reject(result);
      });
      // return await this.redisClient
      //   .multi()
      //   .rpush(`sentRequest:${fromObj.userId}`, to)
      //   .rpush(`receivedRequest:${toObj.userId}`, from)
      //   .exec((error, [[fromError], [toError]]) => {
      //     if (fromError) throw new Error("Error sending request");
      //     if (toError) throw new Error("Error sending request");
      //   })
      //   .catch((error) => {
      //     throw error;
      //   });
    } catch (error) {
      throw error;
    }
  }

  async searchFriend(email) {
    try {
      return new Promise((resolve, reject) => {
        this.redisClient.hget(`user:${email}`, "user", (error, result) => {
          if (error) throw error;
          return resolve({
            result: true,
            error: null,
            data: JSON.parse(result),
          });
        });
      });
    } catch (error) {
      return {
        result: false,
        error,
        data: null,
      };
    }
  }

  async getFriendRequests(userId) {
    try {
      return new Promise((resolve, reject) => {
        this.redisClient.lrange(
          `receivedRequest:${userId}`,
          0,
          -1,
          (error, results) => {
            if (error) throw error;
            return resolve({
              result: true,
              error: null,
              data: results.map((res) => JSON.parse(res)),
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

  async getSentRequests(userId) {
    try {
      return new Promise((resolve, reject) => {
        this.redisClient.lrange(
          `sentRequest:${userId}`,
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

    return new Promise((resolve, reject) => {
      const result = this.redisClient
        .multi()
        .lrem(`sentRequest:${toObj.userId}`, 0, from)
        .lrem(`receivedRequest:${fromObj.userId}`, 0, to)
        .rpush(`conversation:${fromObj.userId}`, to)
        .rpush(`conversation:${toObj.userId}`, from)
        .exec((result) => console.log("AcceptFriendRequest ", result));
      if (result) resolve(result);
      else reject(result);
    });
  }

  async getConversations(userId) {
    try {
      return new Promise((resolve, reject) => {
        this.redisClient.lrange(
          `conversation:${userId}`,
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
