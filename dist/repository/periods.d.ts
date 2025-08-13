import type { DB } from '../plugins/db.ts';
import type { Period } from '../domain/types.ts';
export declare const makePeriodRepo: (db: DB) => {
    create: (p: Omit<Period, "id">) => Promise<Period>;
    list: (classId?: number) => Promise<Period[]>;
};
//# sourceMappingURL=periods.d.ts.map