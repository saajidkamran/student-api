import type { Class } from '../domain/types.js';

export const makeClassService = (deps: {
  create: (name: string) => Promise<Class>;
  list: () => Promise<Class[]>;
}) => ({
  createClass: deps.create,
  listClasses: deps.list
});
