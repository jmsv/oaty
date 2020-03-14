export interface Options<K> {
    keys?: K[];
}
declare type TransposedValues<T, K extends keyof T, V extends T[K] = T[K]> = {
    [A in V extends string | number | symbol ? V : never]: T[] | undefined;
};
export declare type Transposed<T, K extends keyof T> = {
    [A in keyof T]: TransposedValues<T, K>;
};
export declare class OatyArray<T extends Object = {}, K extends keyof T = keyof T> {
    private _data;
    private _options;
    private _transposed;
    constructor(_data?: T[], _options?: Options<K>);
    readonly keys: K[] | undefined;
    readonly length: number;
    readonly data: T[];
    readonly transposed: Transposed<T, K>;
    get<A extends K>(keyName: A): TransposedValues<T, A>;
    get<A extends K>(keyName: A, keyValue: T[A]): T[];
    push(...data: T[]): number;
    private transpose;
}
export {};
