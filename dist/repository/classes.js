export const makeClassRepo = (db) => ({
    create: async (name) => {
        const [res] = await db.execute('INSERT INTO classes (name) VALUES (?)', [name]);
        const id = res.insertId;
        return { id, name };
    },
    list: async () => {
        const [rows] = await db.query('SELECT id, name FROM classes ORDER BY id DESC');
        return rows;
    }
});
//# sourceMappingURL=classes.js.map