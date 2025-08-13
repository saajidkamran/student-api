import { makeAttendanceService } from '../../src/services/attendance.js';
import type { Attendance } from '../../src/domain/types.js';
import type { Server as IOServer } from 'socket.io';

const record: Attendance = {
  id: 42, studentId: 1, periodId: 1, classId: 2, date: '2025-01-01', status: 'PRESENT'
};

test('markAttendance upserts and emits to class room', async () => {
  const upsert = jest.fn().mockResolvedValue(record);
  const list = jest.fn();

  const emit = jest.fn();
  const to = jest.fn(() => ({ emit }));
  const io = { to } as unknown as IOServer;

  const svc = makeAttendanceService({ upsert, list, io });

  const input = { studentId: 1, periodId: 1, classId: 2, date: '2025-01-01', status: 'PRESENT' as const };
  const res = await svc.markAttendance(input);

  expect(upsert).toHaveBeenCalledWith(input);
  expect(to).toHaveBeenCalledWith('class:2');
  expect(emit).toHaveBeenCalledWith('attendance:update', record);
  expect(res).toEqual(record);
});

test('listAttendance forwards filters', async () => {
  const upsert = jest.fn();
  const out = [record];
  const list = jest.fn().mockResolvedValue(out);
  const io = { to: jest.fn() } as unknown as IOServer;

  const svc = makeAttendanceService({ upsert, list, io });
  const res = await svc.listAttendance({ classId: 2, date: '2025-01-01' });

  expect(list).toHaveBeenCalledWith({ classId: 2, date: '2025-01-01' });
  expect(res).toBe(out);
});
