export interface IOptions {
  keys?: string[], // only these keys will be transposed
  missingKeyReturns?: any, // the return value for when transposed[key] does not exist when using get(key, value)
  noResultsReturns?: any // the return value for when there are no results when using get(key, value)
}

export class OatyArray {
  private _transposed: { [key: string]: any } = {}

  constructor(private _data: object[], private _options: IOptions = {}) {
    this.transpose(_data)
  }

  get keys(): string[] | undefined {
    return this._options.keys
  }

  get length(): number {
    return this._data.length
  }

  get data(): object[] {
    return this._data
  }

  get transposed(): object[] {
    return this._data
  }

  public get(keyName: string, keyValue?: string): object[] | object | any {
    return (keyValue === undefined)
          ? this._transposed[keyName]
          : (this._transposed[keyName] === undefined)
            ? this._options.missingKeyReturns
            : (this._transposed[keyName][keyValue] === undefined)
              ? this._options.noResultsReturns
              : this._transposed[keyName][keyValue]
  }

  public push(...data: object[]) {
    this.transpose(data)
    return this._data.push(...data)
  }

  private transpose(data: object[]) {
    for (const datum of data) {
      for (const key of (this.keys || Object.keys(datum))) {
        if (datum[key] !== undefined) {
          (this._transposed[key] === undefined)
            ? this._transposed[key] = {[datum[key]]: [datum]}
            : ((this._transposed[key][datum[key]] === undefined)
              ? this._transposed[key][datum[key]] = [datum]
              : this._transposed[key][datum[key]].push(datum))
        }
      }
    }
  }
}
