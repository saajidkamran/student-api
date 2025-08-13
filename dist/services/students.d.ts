import type { Student } from '../domain/types.js';
export declare const makeStudentService: (deps: {
    create: (fullName: string, classId: number) => Promise<Student>;
    list: (classId?: number) => Promise<Student[]>;
    getClassIdForStudent: (id: number) => Promise<number>;
}) => {
    createStudent: (fullName: string, classId: number) => Promise<Student>;
    listStudents: (classId?: number) => Promise<Student[]>;
    getClassIdForStudent: (id: number) => Promise<number>;
};
//# sourceMappingURL=students.d.ts.map