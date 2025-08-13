import type { Class } from '../domain/types';
export declare const makeClassService: (deps: {
    create: (name: string) => Promise<Class>;
    list: () => Promise<Class[]>;
}) => {
    createClass: (name: string) => Promise<Class>;
    listClasses: () => Promise<Class[]>;
};
//# sourceMappingURL=classes.d.ts.map