export declare class OatyArray {
    private _original;
    private _keys;
    private _transposed;
    readonly length: number;
    constructor(input: object[], keys: string[]);
    get(keyName: string, keyValue: string): object;
    push(...items: object[]): number;
}
