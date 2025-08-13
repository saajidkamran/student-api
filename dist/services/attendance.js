export const makeAttendanceService = (deps) => ({
    async markAttendance(input) {
        // optional: normalize date to YYYY-MM-DD here
        const record = await deps.upsert(input);
        deps.io.to(`class:${record.classId}`).emit('attendance:update', record);
        return record;
    },
    listAttendance: (f) => deps.list(f),
});
//# sourceMappingURL=attendance.js.map