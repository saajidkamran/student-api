import type { FastifyInstance } from "fastify";
import { z } from "zod";
import { markAttendanceDto, qSchema } from "../../dtos/schemas.js";
import { makeAttendanceRepo } from "../../repository/attendance.js";
import { makeAttendanceService } from "../../services/attendance.js";
import { makeStudentRepo } from "../../repository/students.js";
type AttendanceFilters = z.infer<typeof qSchema>;

export default async function attendanceRoutes(fastify: FastifyInstance) {
  const attendanceRepo = makeAttendanceRepo(fastify.db);
  const attendanceSvc = makeAttendanceService({
    ...attendanceRepo,
    io: fastify.io,
  });
  const studentRepo = makeStudentRepo(fastify.db);

  fastify.post("/attendance", async (req, reply) => {
    const body = markAttendanceDto.parse(req.body);
    const classId = await studentRepo.getClassIdForStudent(body.studentId);
    const saved = await attendanceSvc.markAttendance({ ...body, classId });
    reply.send(saved);
  });

  fastify.get("/attendance", async (req, reply) => {
    const query: AttendanceFilters = qSchema.parse(req.query);
    reply.send(await attendanceSvc.listAttendance(query));
  });
}
