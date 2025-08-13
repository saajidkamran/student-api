import { makeStudentService } from '../../src/services/students.js';

test('create/list/getClassIdForStudent delegate to repo', async () => {
  const repo = {
    create: jest.fn().mockResolvedValue({ id: 7, fullName: 'Alex', classId: 2 }),
    list: jest.fn().mockResolvedValue([]),
    getClassIdForStudent: jest.fn().mockResolvedValue(2)
  };
  const svc = makeStudentService(repo);

  await svc.createStudent('Alex', 2);
  expect(repo.create).toHaveBeenCalledWith('Alex', 2);

  await svc.listStudents(2);
  expect(repo.list).toHaveBeenCalledWith(2);

  const cid = await svc.getClassIdForStudent(7);
  expect(cid).toBe(2);
});
