import { expect } from 'chai'
import { OatyArray } from '../index'

let fixture: Fixture

beforeEach(() => {
  fixture = new Fixture()
})

describe('OatyArray', () => {
  describe('new', () => {
    context('()', () => {
      it('initialises', () => {
        fixture.givenOatyArray()
        fixture.thenOatyArrayExists()
      })
    })

    context('({data})', () => {
      it('initialises', () => {
        const testArray = [
         { a: 1, b: 1, fruit: 'apple' },
         { a: 1, b: 2, fruit: 'apple' },
         { a: 1, b: 3, fruit: 'banana' }]
        fixture.givenOatyArray({data: testArray})
        fixture.thenOatyArrayExists()
        fixture.thenOriginalsEquals(testArray)
      })
    })

    context('({keys})', () => {
      it('initialises', () => {
        fixture.givenOatyArray({keys: ['a', 'b', 'fruit']})
        fixture.thenOatyArrayExists()
        fixture.thenKeysEquals(['a', 'b', 'fruit'])
      })
    })

    context('({data, keys})', () => {
      it('initialises', () => {
        const testArray = [
         { a: 1, b: 1, fruit: 'apple' },
         { a: 1, b: 2, fruit: 'apple' },
         { a: 1, b: 3, fruit: 'banana' }]
        fixture.givenOatyArray({data: testArray, keys: ['a']})
        fixture.thenOatyArrayExists()
        fixture.thenOriginalsEquals(testArray)
        fixture.thenKeysEquals(['a'])
      })
    })
  })

  describe('.push()', () => {
    it('adds data', () => {
      const data = [
       { a: 5, b: 5, fruit: 'potato' },
       { a: 6, b: 6, fruit: 'courgette' }]
      fixture.givenOatyArray()
      fixture.whenDataIsPushed(data)
      fixture.thenOriginalsEquals(data)
    })

    it('retains dereferenced data', () => {
      let data: object[] | undefined = [
       { a: 5, b: 5, fruit: 'potato' },
       { a: 6, b: 6, fruit: 'courgette' }]
      fixture.givenOatyArray()
      fixture.whenDataIsPushed(data!)
      data = undefined
      fixture.thenOriginalsEquals([{ a: 5, b: 5, fruit: 'potato' },
       { a: 6, b: 6, fruit: 'courgette' }])
    })

    it('returns the length of _original', () => {
      const testArray = [
       { a: 1, b: 1, fruit: 'apple' },
       { a: 1, b: 2, fruit: 'apple' },
       { a: 1, b: 3, fruit: 'banana' }]
      const data = [{ a: 1, b: 1, fruit: 'apple' },
       { a: 1, b: 2, fruit: 'apple' },
       { a: 1, b: 3, fruit: 'banana' }]
      fixture.givenOatyArray({data: testArray})
      fixture.whenDataIsPushed(data)
      fixture.thenCountIs(testArray.length + data.length)
    })
  })

  describe('.get()', () => {
    context('initialised data', () => {
      it('returns a match', () => {
        const testArray = [
         { a: 1, b: 1, fruit: 'apple' },
         { a: 1, b: 2, fruit: 'apple' },
         { a: 1, b: 3, fruit: 'banana' }]
        fixture.givenOatyArray({data: testArray})
        fixture.whenGetIsCalledWithKVP('fruit', 'banana')
        fixture.thenMatchesEquals([{a: 1, b: 3, fruit: 'banana'}])
      })
      it('returns matches', () => {
        const testArray = [
         { a: 1, b: 1, fruit: 'apple' },
         { a: 1, b: 2, fruit: 'apple' },
         { a: 1, b: 3, fruit: 'banana' }]
        fixture.givenOatyArray({data: testArray})
        fixture.whenGetIsCalledWithKVP('fruit', 'apple')
        fixture.thenMatchesEquals([
          { a: 1, b: 1, fruit: 'apple' },
          { a: 1, b: 2, fruit: 'apple' }])
      })
    })

    context('pushed data', () => {
      it('returns a match', () => {
        const data = [
          { a: 5, b: 5, fruit: 'potato' },
          { a: 6, b: 6, fruit: 'courgette' }]
        fixture.givenOatyArray()
        fixture.whenDataIsPushed(data)
        fixture.whenGetIsCalledWithKVP('fruit', 'potato')
        fixture.thenMatchesEquals([{ a: 5, b: 5, fruit: 'potato' }])
      })
    })

    context('querying for initialised data alongside pushed data', () => {
      it('returns a match', () => {
        const testArray = [{ a: 1, b: 1, fruit: 'apple' },
          { a: 1, b: 2, fruit: 'apple' },
          { a: 1, b: 3, fruit: 'banana' }]
        const data = [{ a: 5, b: 5, fruit: 'potato' },
          { a: 6, b: 6, fruit: 'courgette' }]
        fixture.givenOatyArray({data: testArray})
        fixture.whenDataIsPushed(data)
        fixture.whenGetIsCalledWithKVP('fruit', 'banana')
        fixture.thenMatchesEquals([{ a: 1, b: 3, fruit: 'banana' }])
      })
    })

    context('querying for pushed data alongside initialised data', () => {
      it('returns a match', () => {
        const testArray = [{ a: 1, b: 1, fruit: 'apple' },
          { a: 1, b: 2, fruit: 'apple' },
          { a: 1, b: 3, fruit: 'banana' }]
        const data = [{ a: 5, b: 5, fruit: 'potato' },
          { a: 6, b: 6, fruit: 'courgette' }]
        fixture.givenOatyArray({data: testArray})
        fixture.whenDataIsPushed(data)
        fixture.whenGetIsCalledWithKVP('fruit', 'potato')
        fixture.thenMatchesEquals([{ a: 5, b: 5, fruit: 'potato' }])
      })
    })
  })
})

class Fixture {
  private _oatyArray: OatyArray | undefined

  private _count: number = 0
  private _matches: object[] = []

  public givenOatyArray(options?: { data?: object[], keys?: string[] }) {
    this._oatyArray = new OatyArray(options)
  }

  public whenDataIsPushed(data: object[]) {
    this._count = this._oatyArray!.push(data)
  }

  public whenGetIsCalledWithKVP(key: string, value: string) {
    this._matches = this._oatyArray!.get(key, value)
  }

  public thenCountIs(count: number) {
    expect(this._count).to.equal(count)
  }

  public thenKeysEquals(keys: string[]) {
    expect(this._oatyArray!.keys).to.deep.equal(keys)
  }

  public thenMatchesEquals(matches: object[]) {
    expect(this._matches).to.deep.equal(matches)
  }

  public thenOatyArrayExists() {
    // tslint:disable-next-line: no-unused-expression
    expect(this._oatyArray).to.exist
  }

  public thenOriginalsEquals(data: object[]) {
    expect(this._oatyArray!.original).to.deep.equal(data)
  }
}
