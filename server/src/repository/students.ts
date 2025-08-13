import type { DB } from '../plugins/db.js';
import type { Student } from '../domain/types.js';

export const makeStudentRepo = (db: DB) => ({
  create: async (fullName: string, classId: number): Promise<Student> => {
    const [res] = await db.execute(
      'INSERT INTO students (name, class_id) VALUES (?, ?)', [fullName, classId]
    );
    const id = (res as any).insertId as number;
    return { id, fullName, classId };
  },

  list: async (classId?: number): Promise<Student[]> => {
    const sql = classId
      ? 'SELECT id, full_name AS fullName, class_id AS classId FROM students WHERE class_id=? ORDER BY id DESC'
      : 'SELECT id, full_name AS fullName, class_id AS classId FROM students ORDER BY id DESC';
    const [rows] = await db.query(sql, classId ? [classId] : []);
    return rows as Student[];
  },

  getClassIdForStudent: async (studentId: number): Promise<number> => {
    const [rows] = await db.query('SELECT class_id AS classId FROM students WHERE id=?', [studentId]);
    // @ts-ignore
    if (!Array.isArray(rows) || rows.length === 0) throw new Error('Student not found');
    // @ts-ignore
    return rows[0].classId as number;
  }
});
