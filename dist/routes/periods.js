import { z } from 'zod';
import { createPeriodDto } from '../dtos/schemas.js';
import { makePeriodRepo } from '../repository/periods.js';
import { makePeriodService } from '../services/periods.js';
export default async function periodsRoutes(fastify) {
    const repo = makePeriodRepo(fastify.db);
    const svc = makePeriodService(repo);
    fastify.post('/periods', async (req, reply) => {
        const p = createPeriodDto.parse(req.body);
        reply.code(201).send(await svc.createPeriod(p));
    });
    const qSchema = z.object({ classId: z.coerce.number().int().positive().optional() });
    fastify.get('/periods', async (req, reply) => {
        const q = qSchema.parse(req.query);
        reply.send(await svc.listPeriods(q.classId));
    });
}
//# sourceMappingURL=periods.js.map