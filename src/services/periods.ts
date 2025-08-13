import type { Period } from '../domain/types.js';

export const makePeriodService = (deps: {
  create: (p: Omit<Period, 'id'>) => Promise<Period>;
  list: (classId?: number) => Promise<Period[]>;
}) => ({
  createPeriod: deps.create,
  listPeriods: deps.list
});
