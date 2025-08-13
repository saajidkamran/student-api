import type { DB } from '../plugins/db.js';
import type { Student } from '../domain/types.js';
export declare const makeStudentRepo: (db: DB) => {
    create: (fullName: string, classId: number) => Promise<Student>;
    list: (classId?: number) => Promise<Student[]>;
    getClassIdForStudent: (studentId: number) => Promise<number>;
};
//# sourceMappingURL=students.d.ts.map