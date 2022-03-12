import { createClient } from "redis";
import config from "../../config.js";

async function connect() {
  try {
    const client = createClient({
      url: `redis://${config.redisHost}:${config.redisPort}`,
    });

    client.auth(config.redisPassword, (err) => {
      if (err) throw err;
    });

    client.on("connect", () => console.log("redis connected"));
    client.on("error", (error) => console.log("redis error", error));

    return client;
  } catch (error) {
    console.log("error", error);
  }
}

const redis = await connect();
export default redis;
