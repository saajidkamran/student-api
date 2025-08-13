export const makeStudentRepo = (db) => ({
    create: async (fullName, classId) => {
        const [res] = await db.execute('INSERT INTO students (full_name, class_id) VALUES (?, ?)', [fullName, classId]);
        const id = res.insertId;
        return { id, fullName, classId };
    },
    list: async (classId) => {
        const sql = classId
            ? 'SELECT id, full_name AS fullName, class_id AS classId FROM students WHERE class_id=? ORDER BY id DESC'
            : 'SELECT id, full_name AS fullName, class_id AS classId FROM students ORDER BY id DESC';
        const [rows] = await db.query(sql, classId ? [classId] : []);
        return rows;
    },
    getClassIdForStudent: async (studentId) => {
        const [rows] = await db.query('SELECT class_id AS classId FROM students WHERE id=?', [studentId]);
        // @ts-ignore
        if (!Array.isArray(rows) || rows.length === 0)
            throw new Error('Student not found');
        // @ts-ignore
        return rows[0].classId;
    }
});
//# sourceMappingURL=students.js.map