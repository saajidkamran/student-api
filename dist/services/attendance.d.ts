import type { Attendance, AttendanceStatus, AttendanceFilters, UpsertAttendance } from '../domain/types.js';
import type { Server as IOServer } from 'socket.io';
export declare const makeAttendanceService: (deps: {
    upsert: (a: UpsertAttendance) => Promise<Attendance>;
    list: (f: AttendanceFilters) => Promise<Attendance[]>;
    io: IOServer;
}) => {
    markAttendance(input: UpsertAttendance & {
        status: AttendanceStatus;
    }): Promise<Attendance>;
    listAttendance: (f: AttendanceFilters) => Promise<Attendance[]>;
};
//# sourceMappingURL=attendance.d.ts.map