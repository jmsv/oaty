export class OatyArray {
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

  public pop(): object | undefined {
    const popped = this._original.pop()

    this._keys.forEach((key) => {
      if (this._transposed[key]) {
        this._transposed[key].remove() // TODO: remove from transposed
      }
    })

    return popped
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
