export declare class OatyArray {
    private _keys;
    private _original;
    private _transposed;
    constructor(options?: {
        data?: object[];
        keys?: string[];
    });
    readonly keys: string[] | undefined;
    readonly length: number;
    readonly original: object[];
    readonly transposed: object[];
    get(keyName: string, keyValue: string): object[];
    push(data: object[]): number;
    private transpose;
}
