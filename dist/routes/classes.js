import { createClassDto } from '../dtos/schemas.js';
import { makeClassRepo } from '../repository/classes.js';
import { makeClassService } from '../services/classes.js';
export default async function classesRoutes(fastify) {
    const repo = makeClassRepo(fastify.db);
    const svc = makeClassService(repo);
    fastify.post('/classes', async (req, reply) => {
        const body = createClassDto.parse(req.body);
        const c = await svc.createClass(body.name);
        reply.code(201).send(c);
    });
    fastify.get('/classes', async (_req, reply) => {
        reply.send(await svc.listClasses());
    });
}
//# sourceMappingURL=classes.js.map