import { createServer } from "http";
import { Server } from "socket.io";
import { createAdapter } from "socket.io-redis";
import { auth } from "./src/middleware/auth.js";
import redis from "./src/config/ioredis.js";
import connection from "./src/events/connection.js";

const httpServer = createServer();
const clientUrl = "http://localhost:3000";

const io = new Server(httpServer, {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST"],
  },
  adapter: createAdapter({
    pubClient: redis,
    subClient: redis.duplicate(),
  }),
});

io.use((socket, next) => auth(socket, next));

io.on("connection", (socket) => connection(io, socket));

export default io;
