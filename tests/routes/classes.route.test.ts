import Fastify from 'fastify';
import classesRoutes from '../../src/routes/classes.js';

// minimal fake DB + repo by decorating fastify.db and intercepting repo inside route file
// Easiest trick: monkey-patch makeClassRepo via jest.mock.
// But since routes import repo directly, we can decorate fastify.db to satisfy repo calls.
// For unit-ish route test, we can stub fastify.db.query/execute used by repo.

test('POST /classes creates a class', async () => {
  const app = Fastify();
  // Fake db used by makeClassRepo
  (app as any).decorate('db', {
    execute: async (_sql: string, _params: any[]) => [{ insertId: 123 }],
    query: async () => [ [] ]
  });

  await app.register(classesRoutes);

  const res = await app.inject({
    method: 'POST',
    url: '/classes',
    payload: { name: 'Grade X' }
  });

  expect(res.statusCode).toBe(201);
  expect(res.json()).toEqual({ id: 123, name: 'Grade X' });

  await app.close();
});

test('GET /classes lists classes', async () => {
  const app = Fastify();
  (app as any).decorate('db', {
    execute: async () => [{ insertId: 1 }],
    query: async () => [ [{ id: 1, name: 'Grade X' }] ]
  });

  await app.register(classesRoutes);

  const res = await app.inject({ method: 'GET', url: '/classes' });
  expect(res.statusCode).toBe(200);
  expect(res.json()).toEqual([{ id: 1, name: 'Grade X' }]);

  await app.close();
});
