import redis from "../config/ioredis.js";

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
    const value = JSON.stringify(user);
    const { userId, email, lastSeen } = user;
    return await this.redisClient
      .multi()
      .hset(`session:${sessionId}`, "session", value)
      .hset(
        `lastSeen:${userId}`,
        "lastSeen",
        JSON.stringify({ lastSeen: lastSeen })
      )
      .hset(
        `sessionId:${userId}`,
        "sessionId",
        JSON.stringify({ userId, sessionId })
      )
      .hset(`user:${email}`, "user", value)
      .exec()
      .then(([[session], [lastSeen], [sessionId], [user]]) => {
        if (session != null) throw new Error(`Error saving session`);
        if (lastSeen != null) throw new Error(`Error saving last seen`);
        if (sessionId != null) throw new Error(`Error saving session Id`);
        if (user != null) throw new Error(`Error saving user`);
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  }

  async findSession(userId) {
    if (userId) {
      return await this.redisClient
        .multi()
        .hget(`sessionId:${userId}`, "sessionId")
        .exec()
        .then(([[err, result]]) => {
          return JSON.parse(result);
        })
        .catch((error) => {
          throw new Error(error);
        });
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

  async findAllSessions() {
    const keys = new Set();
    let nextIndex = 0;
    do {
      const [nextIndexAsStr, results] = await this.redisClient.scan(
        nextIndex,
        "MATCH",
        "session:*",
        "COUNT",
        "100"
      );
      nextIndex = parseInt(nextIndexAsStr, 10);
      results.forEach((s) => keys.add(s));
    } while (nextIndex !== 0);

    const commands = [];
    keys.forEach((key) => {
      commands.push(["hget", key, "session"]);
    });
    return this.redisClient
      .multi(commands)
      .exec()
      .then((results) => {
        return results.map(([err, session]) => JSON.parse(session));
      });
  }

  async getLastSeen(userId) {
    return await this.redisClient
      .multi()
      .hget(`lastSeen:${userId}`, "lastSeen")
      .exec()
      .then(([[error, result]]) => {
        if (error != null) throw new Error(error);
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

  async getConversations(userId) {
    return await this.redisClient
      .multi()
      .lrange(`conversation:${userId}`, 0, -1)
      .exec()
      .then(([[error, results]]) => {
        if (error != null) throw new Error(error);
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
