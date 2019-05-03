export default class OatyObject {
    private original;
    private keys;
    private transformed;
    constructor(input: object[], keys: string[]);
    get(keyName: string, keyValue: string): object;
}
