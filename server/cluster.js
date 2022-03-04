import cluster from "cluster";
import http from "http";
import { cpus } from "os";
import process from "process";
import { setupMaster, setupWorker } from "@socket.io/sticky";
import { io, socket } from "./socket.js";

const WORKERS_COUNT = 4;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < WORKERS_COUNT; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    console.log(`Worker ${worker.process.pid} died!`);
    cluster.fork();
  });

  const httpServer = http.createServer();
  setupMaster(httpServer, {
    loadBalancingMethod: "least-connection", // random, robin-robin
  });

  const PORT = process.env.PORT || 4000;

  httpServer.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
  });
} else {
  console.log(`Worker ${process.pid} started`);
  setupWorker(io);
}
