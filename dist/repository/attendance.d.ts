import type { DB } from "../plugins/db.js";
import type { Attendance, AttendanceFilters } from "../domain/types.js";
export declare const makeAttendanceRepo: (db: DB) => {
    upsert: (a: Omit<Attendance, "id">) => Promise<Attendance>;
    list: (filters: AttendanceFilters) => Promise<Attendance[]>;
};
//# sourceMappingURL=attendance.d.ts.map