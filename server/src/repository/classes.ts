import type { DB } from '../plugins/db.js';
import type { Class } from '../domain/types.js';

export const makeClassRepo = (db: DB) => ({
  create: async (name: string): Promise<Class> => {
    const [res] = await db.execute('INSERT INTO classes (name) VALUES (?)', [name]);
    const id = (res as any).insertId as number;
    return { id, name };
  },
  list: async (): Promise<Class[]> => {
    const [rows] = await db.query('SELECT id, name FROM classes ORDER BY id DESC');
    return rows as Class[];
  }
});
