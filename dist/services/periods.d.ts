import type { Period } from '../domain/types.js';
export declare const makePeriodService: (deps: {
    create: (p: Omit<Period, "id">) => Promise<Period>;
    list: (classId?: number) => Promise<Period[]>;
}) => {
    createPeriod: (p: Omit<Period, "id">) => Promise<Period>;
    listPeriods: (classId?: number) => Promise<Period[]>;
};
//# sourceMappingURL=periods.d.ts.map