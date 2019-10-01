export interface IOptions {
  keys?: string[] // only these keys will be transposed
}

export interface ITranspose<T> {
  [key: string]: T[]
}

export class OatyArray<T = any> {
  private _transposed: ITranspose<T> = {}

  constructor(private _data: T[], private _options: IOptions = {}) {
    this.transpose(_data)
  }

  get keys(): string[] | undefined {
    return this._options.keys
  }

  get length(): number {
    return this._data.length
  }

  get data(): T[] {
    return this._data
  }

  get transposed(): ITranspose<T> {
    return this._transposed
  }

  public get(keyName: string, keyValue?: string): T[] | undefined {
    if (keyValue === undefined) {
      return this._transposed[keyName]
    }

    if (this._transposed[keyName] === undefined) {
      throw new ReferenceError(`The key '${keyName}' has not been transposed`)
    }

    return this._transposed[keyName][keyValue]
  }

  public push(...data: T[]) {
    this.transpose(data)
    return this._data.push(...data)
  }

  private transpose(data: T[]) {
    if (data) {
      return
    }
    for (const datum of data) {
      for (const key of (this.keys || Object.keys(datum))) {
        if (datum[key] === undefined) {
          continue
        }
        if (this._transposed[key] === undefined) {
          this._transposed[key] = {[datum[key]]: [datum]}
          continue
        }
        if (this._transposed[key][datum[key]] === undefined) {
          this._transposed[key][datum[key]] = [datum]
          continue
        }
        this._transposed[key][datum[key]].push(datum)
      }
    }
  }
}
