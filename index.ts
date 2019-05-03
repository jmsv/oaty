export default class OatyObject {
  private original: object[]
  private keys: string[]

  private transformed: object = {}

  constructor(input: object[], keys: string[]) {
    this.original = input
    this.keys = keys

    this.transformed = keys.reduce((acc, newKey) => {
      acc[newKey] = transform(input, newKey)
      return acc
    }, {})
  }

  public get(keyName: string, keyValue: string): object {
    return this.transformed[keyName][keyValue]
  }
}

const transform = (array: object[], targetKey: string): object => {
  return array.reduce((acc, item) => {
    if (acc[item[targetKey]]) {
      acc[item[targetKey]].push(item)
    } else {
      acc[item[targetKey]] = [item]
    }

    return acc
  }, {})
}
