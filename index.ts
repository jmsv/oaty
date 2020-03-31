export interface Options<K> {
  keys?: K[] // only these keys will be transposed
}

type TransposedValues<T, K extends keyof T> = {
  [V in T[K] extends string | number | symbol ? T[K] : never]: T[] | undefined
};

export type Transposed<T, K extends keyof T> = {
  [Key in keyof T]: TransposedValues<T, K>
};

/**
 * If T is not never, use T. Otherwise, infer the type from the keys K
 */
type InferType<T, K extends keyof any> =
  [T] extends [never] ?
    [K] extends [never] ?
      any
      :
      {[Key in K]: any} & { [Key in string | number | symbol]: any }
    :
    T;

export class OatyArray<T = never, K extends keyof T = never> {
  private _transposed = {} as Transposed<InferType<T, K>, K>;
  private _data: InferType<T, K>[];

  constructor(
      data: readonly InferType<T, K>[] = [], 
      private _options: Options<K> = { 
        keys: data.length > 0 ? 
          Object.keys(data[0] as object) as K[] 
          : 
          undefined
      }) {
    this._data = [...data];
    this.transpose(this._data)
  }

  get keys(): [K] extends [never] ? undefined : K[] {
    return this._options.keys as [K] extends [never] ? undefined : K[]
  }

  get length(): number {
    return this._data.length
  }

  get data(): InferType<T, K>[] {
    return this._data
  }

  get transposed(): Transposed<InferType<T, K>, K> {
    return this._transposed
  }

  public get<SK extends K>(keyName: SK): TransposedValues<InferType<T, K>, SK>;
  public get<SK extends K>(keyName: SK, keyValue: InferType<T, K>[SK]): InferType<T, K>[] | undefined;
  public get<SK extends K>(keyName: SK, keyValue?: InferType<T, K>[SK]): TransposedValues<InferType<T, K>, SK> | InferType<T, K>[] | undefined {
    if (this._transposed[keyName] === undefined) {
      throw new ReferenceError(`The key '${keyName}' has not been transposed`)
    }

    if (keyValue === undefined) {
      return this._transposed[keyName]
    }

    return this._transposed[keyName][keyValue as keyof TransposedValues<InferType<T, K>, SK>]
  }

  public push(...data: readonly InferType<T, K>[]) {
    this.transpose(data)
    return this._data.push(...data)
  }

  private transpose(data: readonly InferType<T, K>[]) {
    for (const datum of data) {
      for (const key of (this.keys ?? Object.keys(datum) as (keyof typeof datum)[])) {
        if (datum[key] === undefined) {
          continue	
        }
        
        const searchKey = datum[key] as keyof TransposedValues<InferType<T, K>, K>;

        if (this._transposed[key] === undefined) {
          this._transposed[key] = { [searchKey]: [datum] } as TransposedValues<InferType<T, K>, K>
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
