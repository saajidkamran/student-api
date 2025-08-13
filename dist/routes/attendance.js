import { z } from 'zod';
import { markAttendanceDto } from '../dtos/schemas.js';
import { makeAttendanceRepo } from '../repository/attendance.js';
import { makeAttendanceService } from '../services/attendance.js';
import { makeStudentRepo } from '../repository/students.js';
export default async function attendanceRoutes(fastify) {
    const attendanceRepo = makeAttendanceRepo(fastify.db);
    const attendanceSvc = makeAttendanceService({ ...attendanceRepo, io: fastify.io });
    const studentRepo = makeStudentRepo(fastify.db);
    fastify.post('/attendance', async (req, reply) => {
        const body = markAttendanceDto.parse(req.body);
        const classId = await studentRepo.getClassIdForStudent(body.studentId);
        const saved = await attendanceSvc.markAttendance({ ...body, classId });
        reply.send(saved);
    });
    const qSchema = z.object({
        classId: z.coerce.number().int().positive().optional(),
        date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
        periodId: z.coerce.number().int().positive().optional(),
    });
    fastify.get('/attendance', async (req, reply) => {
        const q = qSchema.parse(req.query);
        reply.send(await attendanceSvc.listAttendance(q));
    });
}
//# sourceMappingURL=attendance.js.map