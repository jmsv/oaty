export default class OatyObject {
  private _original: object[]
  private _keys: string[]
  private _transposed: object = {}

  get length(): number {
    return this._original.length
  }

  constructor(input: object[], keys: string[]) {
    this._original = input.map((x) => Object.assign({}, x))
    this._keys = keys

    this._transposed = transpose(this._keys, this._original)
  }

  public get(keyName: string, keyValue: string): object {
    return this._transposed[keyName][keyValue]
  }

  public push(...items: object[]): number {
    this._transposed = transpose(this._keys, items, this._transposed)
    return this._original.push(...items)
  }
}

const transpose = (keys: string[], items: object[], current?: object) => {
  return keys.reduce((transposed, key) => {
    transposed[key] = items.reduce((acc, item) => {
      acc[item[key]] ? acc[item[key]].push(item) : acc[item[key]] = [item]
      return acc
    }, current || {})
    return transposed
  }, {})
}
