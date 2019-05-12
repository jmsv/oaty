export declare class OatyArray {
    private keys;
    private original;
    private transposed;
    constructor(options?: {
        data?: object[];
        keys?: string[];
    });
    readonly length: number;
    getKeys(): string[] | undefined;
    getOriginal(): object[];
    getTransposed(): object[];
    get(keyName: string, keyValue: string): object[] | undefined;
    push(...data: object[]): number;
    private getKeysForObject;
    private transpose;
}
