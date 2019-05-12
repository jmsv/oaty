export class OatyArray {
  private keys: string[] | undefined
  private original: object[] = []
  private transposed: { [key: string]: any } = {}

  constructor(options?: { data?: object[], keys?: string[] }) {
    if (options !== undefined) {
      if (options.data !== undefined) { this.push(...options.data) }
      if (options.keys !== undefined) { this.keys = options.keys }
    }
  }

  get length(): number {
    return this.original.length
  }

  public getKeys(): string[] | undefined {
    return this.keys
  }

  public getOriginal(): object[] {
    return this.original
  }

  public getTransposed(): object[] {
    return this.original
  }

  public get(keyName: string, keyValue: string): object[] | undefined {
    if (this.transposed === undefined
     || this.transposed[keyName] === undefined) {
      return undefined
    }
    return this.transposed[keyName][keyValue]
  }

  public push(...data: object[]) {
    data.forEach((datum) => {
      const clone = Object.assign({}, datum)
      this.original.push(clone)
      this.transpose(clone)
    })
    return this.length
  }

  private getKeysForObject(datum: object): string[] {
    return this.keys !== undefined ? this.keys : Object.keys(datum)
  }

  private transpose(datum: { [key: string]: any }) {
    this.getKeysForObject(datum).forEach((key) => {
      if (datum[key] === undefined) {
        return
      }
      if (this.transposed[key] === undefined) {
        this.transposed[key] = {}
      }
      if (this.transposed[key][datum[key]] === undefined) {
        this.transposed[key][datum[key]] = [datum]
      } else {
        this.transposed[key][datum[key]].push(datum)
      }
    })
  }
}
