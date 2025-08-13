import { z } from 'zod';
export declare const createClassDto: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export declare const createStudentDto: z.ZodObject<{
    fullName: z.ZodString;
    classId: z.ZodNumber;
}, z.core.$strip>;
export declare const createPeriodDto: z.ZodObject<{
    classId: z.ZodNumber;
    name: z.ZodString;
    startTime: z.ZodString;
    endTime: z.ZodString;
}, z.core.$strip>;
export declare const markAttendanceDto: z.ZodObject<{
    studentId: z.ZodNumber;
    periodId: z.ZodNumber;
    date: z.ZodString;
    status: z.ZodEnum<{
        PRESENT: "PRESENT";
        ABSENT: "ABSENT";
        LATE: "LATE";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=schemas.d.ts.map