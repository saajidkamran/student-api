//  creates DB pool
import fp from 'fastify-plugin';
import mysql from 'mysql2/promise';
export default fp(async (fastify) => {
    const pool = mysql.createPool({
        host: process.env.DB_HOST ?? '127.0.0.1',
        user: process.env.DB_USER ?? 'root',
        password: process.env.DB_PASSWORD ?? '',
        database: process.env.DB_NAME ?? 'school',
        waitForConnections: true,
        connectionLimit: 10, // tweak if needed
        maxIdle: 10, // mysql2 v3 idle pool size
        idleTimeout: 60000 // 60s
    });
    fastify.decorate('db', pool);
    fastify.addHook('onClose', async () => {
        await pool.end();
    });
});
//# sourceMappingURL=db.js.map