import type { FastifyInstance } from "fastify";
import { buildApp } from "./app.js";

const PORT = Number(process.env.PORT ?? 3000);

let app: FastifyInstance;

async function start() {
  try {
    app = await buildApp(); 
    await app.listen({ port: PORT, host: "0.0.0.0" });
    app.log.info(`Up on :${PORT}`);
  } catch (err) {
    (app?.log ?? console).error(err);
    process.exit(1);
  }
}

start();
