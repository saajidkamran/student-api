import Fastify from 'fastify';
import cors from '@fastify/cors';
import dbPlugin from './plugins/db.js';
import ioPlugin from './plugins/io.js';
import classesRoutes from './routes/classes.js';
import studentsRoutes from './routes/students.js';
import periodsRoutes from './routes/periods.js';
import attendanceRoutes from './routes/attendance.js';
export async function buildApp() {
    const app = Fastify({ logger: true });
    await app.register(cors, { origin: '*' });
    await app.register(dbPlugin);
    await app.register(ioPlugin);
    await app.register(classesRoutes);
    await app.register(studentsRoutes);
    await app.register(periodsRoutes);
    await app.register(attendanceRoutes);
    return app;
}
//# sourceMappingURL=app.js.map