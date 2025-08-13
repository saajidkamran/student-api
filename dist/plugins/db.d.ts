import mysql from 'mysql2/promise';
export type DB = mysql.Pool;
declare module 'fastify' {
    interface FastifyInstance {
        db: DB;
    }
}
declare const _default: (fastify: import("fastify").FastifyInstance<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").FastifyBaseLogger, import("fastify").FastifyTypeProviderDefault>) => Promise<void>;
export default _default;
//# sourceMappingURL=db.d.ts.map