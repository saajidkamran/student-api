import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import mysql from 'mysql2/promise';

const {
  DB_HOST = '127.0.0.1',
  DB_USER = 'root',
  DB_PASSWORD = '',
  DB_NAME = 'school'
} = process.env;

async function main() {
  // 1) connect without DB to create it if needed
  const root = await mysql.createConnection({ host: DB_HOST, user: DB_USER, password: DB_PASSWORD, multipleStatements: true });
  await root.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
  await root.end();

  // 2) connect to the target DB
  const db = await mysql.createConnection({
    host: DB_HOST, user: DB_USER, password: DB_PASSWORD, database: DB_NAME, multipleStatements: true
  });

  // 3) run every .sql file in sql/migrations in alpha order
  const dir = path.resolve('sql/migrations');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.sql')).sort();

  for (const file of files) {
    const sql = fs.readFileSync(path.join(dir, file), 'utf8');
    console.log(`→ Running ${file}`);
    await db.query(sql);
  }

  await db.end();
  console.log('✅ Migrations complete');
}

main().catch((e) => {
  console.error('Migration failed:', e);
  process.exit(1);
});
