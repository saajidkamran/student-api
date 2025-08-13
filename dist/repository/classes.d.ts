import type { DB } from '../plugins/db.js';
import type { Class } from '../domain/types.js';
export declare const makeClassRepo: (db: DB) => {
    create: (name: string) => Promise<Class>;
    list: () => Promise<Class[]>;
};
//# sourceMappingURL=classes.d.ts.map