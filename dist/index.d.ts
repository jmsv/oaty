export interface Options {
    keys?: string[];
    missingKeyReturns?: any;
    noResultsReturns?: any;
}
export declare class OatyArray {
    private _data;
    private _options;
    private _transposed;
    constructor(_data: object[], _options?: Options);
    readonly keys: string[] | undefined;
    readonly length: number;
    readonly data: object[];
    readonly transposed: object[];
    get(keyName: string, keyValue?: string): object[] | any;
    push(...data: object[]): number;
    private transpose;
}
