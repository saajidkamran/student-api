import type { Attendance, AttendanceStatus, AttendanceFilters, UpsertAttendance } from '../domain/types.js';
import type { Server as IOServer } from 'socket.io';

export const makeAttendanceService = (deps: {
  upsert: (a: UpsertAttendance) => Promise<Attendance>;
  list: (f: AttendanceFilters) => Promise<Attendance[]>;
  io: IOServer;
}) => ({
  async markAttendance(input: UpsertAttendance & { status: AttendanceStatus }) {
    // optional: normalize date to YYYY-MM-DD here
    const record = await deps.upsert(input);
    deps.io.to(`class:${record.classId}`).emit('attendance:update', record);
    return record;
  },
  listAttendance: (f: AttendanceFilters) => deps.list(f),
});
