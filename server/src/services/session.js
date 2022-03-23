import redis from "../config/redis.js";

class SessionStorage {
  saveSession(sessionId, user) {}
  findSession(sessionId) {}
  findUserSession(userId) {}
  findAllSessions() {}
  getLastSeen(userId) {}
  getConversations(userId) {}
}

export class InMemorySessionStore extends SessionStorage {
  constructor() {
    super();
    this.sessions = new Map();
  }

  saveSession(sessionId, user) {
    this.sessions.set(sessionId, user);
  }

  findSession(sessionId) {
    return this.sessions.get(sessionId);
  }

  findAllSessions() {
    return [...this.sessions.values()];
  }
}

export class RedisSessionStorage extends SessionStorage {
  constructor() {
    super();
    this.redisClient = redis;
  }

  async saveSession(sessionId, user) {
    try {
      const value = JSON.stringify(user);
      const { userId, email, lastSeen } = user;
      const [sessionResult, lastSeenResult, sessionIdResult, userResult] =
        await Promise.all([
          this.redisClient.hset(`session:${sessionId}`, "session", value),
          this.redisClient.hset(
            `lastSeen:${userId}`,
            "lastSeen",
            JSON.stringify({ lastSeen })
          ),
          this.redisClient.hset(
            `sessionId:${userId}`,
            "sessionId",
            JSON.stringify({ userId, sessionId })
          ),
          this.redisClient.hset(`user:${email}`, "user", value),
        ]);
      if (!sessionResult) throw new Error(`Error saving session`);
      if (!lastSeenResult) throw new Error(`Error saving last seen`);
      if (!sessionIdResult) throw new Error(`Error saving session Id`);
      if (!userResult) throw new Error(`Error saving user`);
    } catch (error) {
      throw error;
    }
  }

  async findSession(userId) {
    if (userId) {
      try {
        return new Promise((resolve, reject) => {
          this.redisClient.hget(
            `sessionId:${userId}`,
            "sessionId",
            (error, session) => {
              if (error) throw error;
              return resolve(JSON.parse(session));
            }
          );
        });
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error("No userId was passed");
    }
  }

  async findUserSession(users) {
    const commands = [];
    users.forEach(({ userId }) => {
      commands.push(["hget", `sessionId:${userId}`, "sessionId"]);
    });
    return await this.redisClient
      .multi(commands)
      .exec()
      .then((results) => {
        return results.map(([err, result]) => JSON.parse(result));
      })
      .catch((error) => console.log(error));
  }

  async getLastSeen(userId) {
    try {
      return new Promise((resolve, reject) => {
        this.redisClient.hget(
          `lastSeen:${userId}`,
          "lastSeen",
          (error, result) => {
            if (error) throw error;
            return resolve({
              result: true,
              error: null,
              data: JSON.parse(result),
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
    // return await this.redisClient
    //   .multi()
    //   .hget(`lastSeen:${userId}`, "lastSeen")
    //   .exec()
    //   .then(([[error, result]]) => {
    //     if (error != null) throw new Error(error);
    //     return {
    //       result: true,
    //       error: null,
    //       data: JSON.parse(result),
    //     };
    //   })
    //   .catch((error) => {
    //     return {
    //       result: false,
    //       error,
    //       data: null,
    //     };
    //   });
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
