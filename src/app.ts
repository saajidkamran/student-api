import Fastify from "fastify";
import cors from "@fastify/cors";
import dbPlugin from "./plugins/db.js";
import ioPlugin from "./plugins/io.js";

// versioned router
import v1Router from "./routes/v1/index.js";
// non-versioned
import healthRoutes from "./routes/health.js";

export async function buildApp() {
  const app = Fastify({ logger: true });

  // core plugins
  await app.register(cors, { origin: "*" });
  await app.register(dbPlugin);
  await app.register(ioPlugin);

  // versioned API
  await app.register(v1Router, { prefix: "/api/v1" });

  // non-versioned routes (e.g., health)
  await app.register(healthRoutes, { prefix: "/" });

  app.setNotFoundHandler((req, reply) => {
    reply.code(404).send({
      error: { code: "NOT_FOUND", message: "Route not found" },
    });
  });

  await app.ready();

  return app;
}
