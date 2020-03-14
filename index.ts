export interface Options<K> {
  keys?: K[] // only these keys will be transposed
}

type TransposedValues<T, K extends keyof T, V extends T[K] = T[K]> = { 
  [A in V extends string | number | symbol ? V : never]: T[] | undefined
};

export type Transposed<T, K extends keyof T> = {
  [A in keyof T] : TransposedValues<T, K>
};

export class OatyArray<T extends Object = {}, K extends keyof T = keyof T> {
  private _transposed = {} as Transposed<T, K>;

  constructor(private _data: T[] = [], private _options: Options<K> = {}) {
    this.transpose(_data)
  }

  get keys(): K[] | undefined {
    return this._options.keys
  }

  get length(): number {
    return this._data.length
  }

  get data(): T[] {
    return this._data
  }

  get transposed(): Transposed<T, K> {
    return this._transposed
  }

  public get<A extends K>(keyName: A): TransposedValues<T, A>;
  public get<A extends K>(keyName: A, keyValue: T[A]): T[];
  public get<A extends K>(keyName: A, keyValue?: T[A]): TransposedValues<T, A> | T[] | undefined {
    if (keyValue === undefined) {
      return this._transposed[keyName]
    }

    return this._transposed[keyName][keyValue as keyof TransposedValues<T, A>]
  }

  public push(...data: T[]) {
    this.transpose(data)
    return this._data.push(...data)
  }

  private transpose(data: T[]) {
    for (const datum of data) {
      for (const key of (this.keys || Object.keys(datum) as (keyof typeof datum)[])) {
        if (datum[key] === undefined) {
          continue
        }

        const searchKey = datum[key] as keyof TransposedValues<T, K>;
        
        if (this._transposed[key] === undefined) {
          this._transposed[key] = {[searchKey]: [datum]} as TransposedValues<T, K>
          continue
        }

        if (this._transposed[key][searchKey] === undefined) {
          this._transposed[key][searchKey] = [datum]
          continue
        }
        this._transposed[key][searchKey]!.push(datum)
      }
    }
  }
}
