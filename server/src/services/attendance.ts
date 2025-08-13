import type {
  Attendance,
  AttendanceStatus,
  AttendanceFilters,
  UpsertAttendance,
} from "../domain/types.js";
import type { Server as IOServer } from "socket.io";

export const makeAttendanceService = (deps: {
  upsert: (a: UpsertAttendance) => Promise<Attendance>;
  list: (f: AttendanceFilters) => Promise<Attendance[]>;
  io: IOServer;
}) => ({
  async markAttendance(input: UpsertAttendance & { status: AttendanceStatus }) {
    const record = await deps.upsert(input);
    
    //Access a Class
    deps.io.to(`class:${record.classId}`).emit("attendance:update", record);
   
    //Access global
    deps.io.to("class:all").emit("attendance:update", record);
    return record;
  },
  listAttendance: (f: AttendanceFilters) => deps.list(f),
});
