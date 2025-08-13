import fp from "fastify-plugin";
import { Server as IOServer } from "socket.io";
import type { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    io: IOServer;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const io = new IOServer(fastify.server, {
    cors: { origin: "*" }, // tighten for prod if needed
    path: "/socket.io", // default; customize if you want
  });

  io.on("connection", (socket) => {
    // Client can join a classroom to get real-time attendance updates
    socket.on("join_class", ({ classId }: { classId?: number }) => {
      if (!classId || Number.isNaN(classId)) return;
      socket.join(`class:${classId}`);
    });
    // Client  join all classroom to get real-time attendance updates
    socket.on("join_all", () => socket.join("class:all"));

    socket.on("leave_class", ({ classId }: { classId?: number }) => {
      if (!classId || Number.isNaN(classId)) return;
      socket.leave(`class:${classId}`);
    });
  });

  fastify.decorate("io", io);

  fastify.addHook("onClose", async () => {
    // io.close() is optional; Fastify server close will drop it.
    io.removeAllListeners();
  });
});
