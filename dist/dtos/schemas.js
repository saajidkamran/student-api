//  Zod schemas for validation
import { z } from 'zod';
export const createClassDto = z.object({ name: z.string().min(1).max(100) });
export const createStudentDto = z.object({
    fullName: z.string().min(1).max(150),
    classId: z.number().int().positive()
});
export const createPeriodDto = z.object({
    classId: z.number().int().positive(),
    name: z.string().min(1).max(50),
    startTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/),
    endTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/)
});
export const markAttendanceDto = z.object({
    studentId: z.number().int().positive(),
    periodId: z.number().int().positive(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    status: z.enum(['PRESENT', 'ABSENT', 'LATE'])
});
//# sourceMappingURL=schemas.js.map