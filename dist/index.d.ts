export interface IOptions {
    keys?: string[];
}
export declare type Transposed<T> = {
    [key: string]: {
        [key: string]: [T];
    };
};
export declare class OatyArray<T = any> {
    private _data;
    private _options;
    private _transposed;
    constructor(_data?: T[], _options?: IOptions);
    readonly keys: string[] | undefined;
    readonly length: number;
    readonly data: T[];
    readonly transposed: Transposed<T>;
    get(keyName: string, keyValue?: string): {
        [key: string]: [T];
    } | T[] | undefined;
    push(...data: T[]): number;
    private transpose;
}
