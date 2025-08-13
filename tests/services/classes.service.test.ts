import { makeClassService } from '../../src/services/classes.js';
import type { Class } from '../../src/domain/types.js';

test('createClass calls repo.create', async () => {
  const created: Class = { id: 1, name: 'Grade 10A' };
  const repo = { create: jest.fn().mockResolvedValue(created), list: jest.fn() };
  const svc = makeClassService(repo);
  const res = await svc.createClass('Grade 10A');
  expect(repo.create).toHaveBeenCalledWith('Grade 10A');
  expect(res).toEqual(created);
});

test('listClasses calls repo.list', async () => {
  const listOut: Class[] = [{ id: 1, name: 'Grade 10A' }];
  const repo = { create: jest.fn(), list: jest.fn().mockResolvedValue(listOut) };
  const svc = makeClassService(repo);
  expect(await svc.listClasses()).toBe(listOut);
});
