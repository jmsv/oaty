export interface Options<K> {
    keys?: K[];
}
declare type TransposedValues<T, K extends keyof T> = {
    [V in T[K] extends string | number | symbol ? T[K] : never]: T[] | undefined;
};
export declare type Transposed<T, K extends keyof T> = {
    [Key in keyof T]: TransposedValues<T, K>;
};
/**
 * If T is not never, use T. Otherwise, infer the type from the keys K
 */
declare type InferType<T, K extends keyof any> = [T] extends [never] ? [K] extends [never] ? any : {
    [Key in K]: any;
} & {
    [Key in string | number | symbol]: any;
} : T;
export declare class OatyArray<T = never, K extends keyof T = never> {
    private _options;
    private _transposed;
    private _data;
    constructor(data?: readonly InferType<T, K>[], _options?: Options<K>);
    get keys(): [K] extends [never] ? undefined : K[];
    get length(): number;
    get data(): InferType<T, K>[];
    get transposed(): Transposed<InferType<T, K>, K>;
    get<SK extends K>(keyName: SK): TransposedValues<InferType<T, K>, SK>;
    get<SK extends K>(keyName: SK, keyValue: InferType<T, K>[SK]): InferType<T, K>[] | undefined;
    push(...data: readonly InferType<T, K>[]): number;
    private transpose;
}
export {};
