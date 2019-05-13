export declare class OatyArray {
    private _keys;
    private _original;
    private _transposed;
    constructor(data?: object[], options?: {
        keys?: string[];
    });
    readonly keys: string[] | undefined;
    readonly length: number;
    readonly original: object[];
    readonly transposed: object[];
    get(keyName: string, keyValue: string): object[] | undefined;
    push(...data: object[]): number;
    private transpose;
}
