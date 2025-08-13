export const makeAttendanceRepo = (db) => ({
    upsert: async (a) => {
        const sql = `
      INSERT INTO attendance (student_id, period_id, class_id, date, status)
      VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE status = VALUES(status), updated_at = CURRENT_TIMESTAMP
    `;
        await db.execute(sql, [
            a.studentId,
            a.periodId,
            a.classId,
            a.date,
            a.status,
        ]);
        const [rows] = await db.query(`SELECT id, student_id AS studentId, period_id AS periodId, class_id AS classId,
              DATE_FORMAT(date, '%Y-%m-%d') AS date, status
       FROM attendance
       WHERE student_id=? AND period_id=? AND date=?`, [a.studentId, a.periodId, a.date]);
        // @ts-ignore
        return rows[0];
    },
    list: async (filters) => {
        const where = [];
        const params = [];
        if (filters.classId) {
            where.push("class_id=?");
            params.push(filters.classId);
        }
        if (filters.date) {
            where.push("date=?");
            params.push(filters.date);
        }
        if (filters.periodId) {
            where.push("period_id=?");
            params.push(filters.periodId);
        }
        const sql = `
      SELECT id, student_id AS studentId, period_id AS periodId, class_id AS classId,
             DATE_FORMAT(date, '%Y-%m-%d') AS date, status
      FROM attendance
      ${where.length ? "WHERE " + where.join(" AND ") : ""}
      ORDER BY updated_at DESC
    `;
        const [rows] = await db.query(sql, params);
        return rows;
    },
});
//# sourceMappingURL=attendance.js.map