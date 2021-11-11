import Redis from "ioredis";

const port = process.env.redisPort || 6379;

const redisClient = new Redis(port);
export default redisClient;
