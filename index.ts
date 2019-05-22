export class OatyArray {
  private _keys: string[] | undefined
  private _original: object[] = []
  private _transposed: { [key: string]: any } = {}

  constructor(options?: { data?: object[], keys?: string[] }) {
    if (options !== undefined) {
      if (options.data !== undefined) { this.push(options.data) }
      this._keys = options.keys
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

  public get(keyName: string, keyValue: string): object[] {
    return this._transposed[keyName][keyValue] || []
  }

  public push(data: object[]) {
    data.forEach((datum: object) => {
      this._original.push(datum)
      this.transpose(datum)
    })
    return this._original.length
  }

  private transpose(datum: { [key: string]: any }) {
    (this._keys || Object.keys(datum)).forEach((key: string) => {
      if (datum[key] !== undefined) {
        (this._transposed[key] === undefined)
          ? this._transposed[key] = {[datum[key]]: [datum]}
          : ((this._transposed[key][datum[key]] === undefined)
            ? this._transposed[key][datum[key]] = [datum]
            : this._transposed[key][datum[key]].push(datum))
      }
    })
  }
}
