import type { Student } from '../domain/types.js';

export const makeStudentService = (deps: {
  create: (fullName: string, classId: number) => Promise<Student>;
  list: (classId?: number) => Promise<Student[]>;
  getClassIdForStudent: (id: number) => Promise<number>;
}) => ({
  createStudent: deps.create,
  listStudents: deps.list,
  getClassIdForStudent: deps.getClassIdForStudent
});
