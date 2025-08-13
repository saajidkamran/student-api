import { z } from 'zod';
import { createStudentDto } from '../dtos/schemas.js';
import { makeStudentRepo } from '../repository/students.js';
import { makeStudentService } from '../services/students.js';
export default async function studentsRoutes(fastify) {
    const repo = makeStudentRepo(fastify.db);
    const svc = makeStudentService(repo);
    fastify.post('/students', async (req, reply) => {
        const body = createStudentDto.parse(req.body);
        reply.code(201).send(await svc.createStudent(body.fullName, body.classId));
    });
    const qSchema = z.object({ classId: z.coerce.number().int().positive().optional() });
    fastify.get('/students', async (req, reply) => {
        const q = qSchema.parse(req.query);
        reply.send(await svc.listStudents(q.classId));
    });
}
//# sourceMappingURL=students.js.map