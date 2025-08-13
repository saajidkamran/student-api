import type { FastifyInstance } from 'fastify';
import { createClassDto } from '../../dtos/schemas.js';
import { makeClassRepo } from '../../repository/classes.js';
import { makeClassService } from '../../services/classes.js';

export default async function classesRoutes(fastify: FastifyInstance) {
  const repo = makeClassRepo(fastify.db);
  const svc  = makeClassService(repo);

  fastify.post('/classes', async (req, reply) => {
    const body = createClassDto.parse(req.body);
    const createdClass = await svc.createClass(body.name);
    reply.code(201).send(createdClass);
  });

  fastify.get('/classes', async (_req, reply) => {
    reply.send(await svc.listClasses());
  });
}
