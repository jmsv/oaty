export class OatyArray {
  private _keys: string[] | undefined
  private _original: object[] = []
  private _transposed: { [key: string]: any } = {}

  constructor(data?: object[], options?: { keys?: string[] }) {
    if (data !== undefined) { this.push(...data) }
    if (options !== undefined) {
      if (options.keys !== undefined) { this._keys = options.keys }
    }
  }

  get keys(): string[] | undefined {
    return this._keys
  }

  get length(): number {
    return this._original.length
  }

  get original(): object[] {
    return this._original
  }

  get transposed(): object[] {
    return this._original
  }

  public get(keyName: string, keyValue: string): object[] | undefined {
    if (this._transposed[keyName] === undefined) {
      return undefined
    }
    return this._transposed[keyName][keyValue]
  }

  public push(...data: object[]) {
    data.forEach((datum) => {
      const clone = Object.assign({}, datum)
      this._original.push(clone)
      this.transpose(clone)
    })
    return this._original.length
  }

  private transpose(datum: { [key: string]: any }) {
    (this._keys || Object.keys(datum)).forEach((key: string) => {
      if (datum[key] === undefined) {
        return
      }
      if (this._transposed[key] === undefined) {
        this._transposed[key] = {}
      }
      if (this._transposed[key][datum[key]] === undefined) {
        this._transposed[key][datum[key]] = [datum]
      } else {
        this._transposed[key][datum[key]].push(datum)
      }
    })
  }
}
