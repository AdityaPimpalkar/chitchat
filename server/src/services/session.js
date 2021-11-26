import redis from "../config/ioredis.js";

class SessionStorage {
  saveSession(sessionId, user) {}
  findSession(sessionId) {}
  findUserSession(userId) {}
  findAllSessions() {}
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
    const { userId, email } = user;
    await this.redisClient
      .multi()
      .hset(`session:${sessionId}`, "session", value)
      .hset(
        `sessionId:${userId}`,
        "sessionId",
        JSON.stringify({ userId, sessionId })
      )
      .hset(`user:${email}`, "user", value)
      .exec();
  }

  async findSession(userId) {
    return await this.redisClient
      .multi()
      .hget(`sessionId:${userId}`, "sessionId")
      .exec()
      .then(([[err, result]]) => {
        return JSON.parse(result);
      })
      .catch((error) => console.log(error));
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
}
