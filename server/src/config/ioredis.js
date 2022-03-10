import Redis from "ioredis";
const redis = new Redis({
  host: process.env.redisHost || "localhost",
  port: process.env.redisPort || 6379,
  password: process.env.redisPassword || "",
});

redis.on("connect", () => console.log("connected to redis"));
redis.on("error", (err) => console.log("err", err));

export default redis;
