import express from "express";
import http from "http";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { auth } from "./src/middleware/auth.js";
import initConnect from "./src/middleware/initConnect.js";
import redis from "./src/config/redis.js";
import config from "./config.js";
import onConnection from "./src/events/onConnection.js";
import onDisconnect from "./src/events/onDisconnect.js";
import directMessage from "./src/events/directMessage.js";
import groupMessage from "./src/events/groupMessage.js";
import friends from "./src/events/friends.js";

const expressServer = express();
const server = http.createServer(expressServer);

const clientUrl = config.clientUrl;

const pubClient = redis;
const subClient = redis.duplicate();

const adapter = createAdapter(pubClient, subClient);

const io = new Server(server, {
  cors: {
    origin: clientUrl,
    methods: ["GET", "POST"],
  },
  adapter,
});

io.use((socket, next) => auth(socket, next));
io.use((socket, next) => initConnect(socket, next));

let socket = null;

io.on("connection", (socketObj) => {
  socket = socketObj;
  onConnection();
  onDisconnect();
  directMessage();
  groupMessage();
  friends();
});

export { io, socket };
