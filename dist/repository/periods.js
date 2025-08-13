export const makePeriodRepo = (db) => ({
    create: async (p) => {
        const [res] = await db.execute('INSERT INTO periods (class_id, name, start_time, end_time) VALUES (?, ?, ?, ?)', [p.classId, p.name, p.startTime, p.endTime]);
        const id = res.insertId;
        return { id, ...p };
    },
    list: async (classId) => {
        const sql = classId
            ? `SELECT id, class_id AS classId, name,
                TIME_FORMAT(start_time, '%H:%i:%s') AS startTime,
                TIME_FORMAT(end_time,   '%H:%i:%s') AS endTime
         FROM periods WHERE class_id=? ORDER BY start_time ASC`
            : `SELECT id, class_id AS classId, name,
                TIME_FORMAT(start_time, '%H:%i:%s') AS startTime,
                TIME_FORMAT(end_time,   '%H:%i:%s') AS endTime
         FROM periods ORDER BY class_id, start_time ASC`;
        const [rows] = await db.query(sql, classId ? [classId] : []);
        return rows;
    }
});
//# sourceMappingURL=periods.js.map