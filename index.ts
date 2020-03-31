export interface Options<K> {
  keys?: K[]; // only these keys will be transposed
}

type TransposedValues<T, K extends keyof T> = {
  [V in T[K] extends string | number | symbol ? T[K] : never]: T[] | undefined;
};

export type Transposed<T, K extends keyof T> = {
  [Key in keyof T]: TransposedValues<T, K>;
};

/**
 * If T is not never, use T. Otherwise, infer the type from the keys K
 */
type InferType<T, K extends keyof any> = [T] extends [never]
  ? [K] extends [never]
    ? any
    : { [Key in K]: any } & { [Key in string | number | symbol]: any }
  : T;

/**
 * Extract all the keys from the given array of objects
 */
const keys = <T>(data: readonly T[]): (keyof T)[] =>
  Array.from(
    data
      .map((item) => Object.keys(item))
      .reduce((keys, itemKeys) => {
        itemKeys.forEach((key) => keys.add(key as keyof T));
        return keys;
      }, new Set<keyof T>())
  );

export class OatyArray<T = never, K extends keyof T = keyof T> {
  private _transposed = {} as Transposed<InferType<T, K>, K>;
  private _data: InferType<T, K>[];
  private _options: Options<K>;

  constructor(
    data: readonly InferType<T, K>[] = [],
    options?: Options<K>
  ) {
    this._data = [...data];
    this._options = options ?? { 
      keys: data.length > 0 ? (keys(data) as K[]) : undefined 
    }
    this.transpose(this._data);
  }

  get keys(): [T] extends [never] ? K[] | undefined : K[] {
    return this._options.keys as [T] extends [never] ? K[] | undefined : K[]
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

  public get<KN extends K>(keyName: KN): TransposedValues<InferType<T, K>, KN>;
  public get<KN extends K>(keyName: KN, keyValue: InferType<T, K>[KN]): InferType<T, K>[] | undefined;
  public get<KN extends K>(keyName: KN, keyValue?: InferType<T, K>[KN]): TransposedValues<InferType<T, K>, KN> | InferType<T, K>[] | undefined {
    if (this._transposed[keyName] === undefined) {
      throw new ReferenceError(`The key '${keyName}' has not been transposed`)
    }

    if (keyValue === undefined) {
      return this._transposed[keyName]
    }

    return this._transposed[keyName][keyValue as keyof TransposedValues<InferType<T, K>, KN>]
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
