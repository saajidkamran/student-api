import fp from 'fastify-plugin';
import { Server as IOServer } from 'socket.io';
import type { FastifyInstance } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    io: IOServer;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  const io = new IOServer(fastify.server, {
    cors: { origin: '*' },   // tighten for prod if needed
    path: '/socket.io'       // default; customize if you want
  });

  io.on('connection', (socket) => {
    // Client can join a classroom to get real-time attendance updates
    socket.on('join_class', ({ classId }: { classId?: number }) => {
      if (!classId || Number.isNaN(classId)) return;
      socket.join(`class:${classId}`);
    });

    // Optional: leave
    socket.on('leave_class', ({ classId }: { classId?: number }) => {
      if (!classId || Number.isNaN(classId)) return;
      socket.leave(`class:${classId}`);
    });
  });

  fastify.decorate('io', io);

  // Graceful cleanup (Socket.IO closes with the underlying server automatically).
  fastify.addHook('onClose', async () => {
    // io.close() is optional; Fastify server close will drop it.
    io.removeAllListeners();
  });
});
