import { expect } from 'chai'
import { IOptions, OatyArray } from '../index'

let fixture: Fixture

describe('OatyArray', () => {
  beforeEach(() => {
    fixture = new Fixture()
  })
  describe('new', () => {
    context('([])', () => {
      it('initialises', () => {
        fixture.givenOatyArray([])
        fixture.thenOatyArrayExists()
      })
    })

    context('([...], {}})', () => {
      it('initialises', () => {
        const initial = [
         { a: 1, b: 1, fruit: 'apple' },
         { a: 1, b: 3, fruit: 'banana' }]
        fixture.givenOatyArray(initial)
        fixture.thenOatyArrayExists()
        fixture.thenOriginalsEquals(initial)
      })
    })

    context('([], {keys})', () => {
      it('initialises', () => {
        fixture.givenOatyArray([], {keys: ['a', 'b', 'fruit']})
        fixture.thenOatyArrayExists()
        fixture.thenKeysEquals(['a', 'b', 'fruit'])
      })
    })

    context('([...], {keys})', () => {
      it('initialises', () => {
        const initial = [
         { a: 1, b: 1, fruit: 'apple' },
         { a: 1, b: 2, fruit: 'apple' },
         { a: 1, b: 3, fruit: 'banana' }]
        fixture.givenOatyArray(initial, {keys: ['a']})
        fixture.thenOatyArrayExists()
        fixture.thenOriginalsEquals(initial)
        fixture.thenKeysEquals(['a'])
      })
    })
  })

  describe('.push()', () => {
    it('adds data', () => {
      const push = [
       { a: 5, b: 5, fruit: 'potato' },
       { a: 6, b: 6, fruit: 'courgette' }]
      fixture.givenOatyArray([])
      fixture.whenDataIsPushed(push)
      fixture.thenOriginalsEquals(push)
    })

    it('retains dereferenced data', () => {
      let push = [
       { a: 5, b: 5, fruit: 'potato' },
       { a: 6, b: 6, fruit: 'courgette' }]
      fixture.givenOatyArray([])
      fixture.whenDataIsPushed(push)
      push = []
      fixture.thenOriginalsEquals([
       { a: 5, b: 5, fruit: 'potato' },
       { a: 6, b: 6, fruit: 'courgette' }])
    })

    it('returns the length of _data', () => {
      const initial = [
       { a: 1, b: 1, fruit: 'apple' },
       { a: 1, b: 2, fruit: 'apple' },
       { a: 1, b: 3, fruit: 'banana' }]
      const push = [{ a: 1, b: 1, fruit: 'apple' },
       { a: 1, b: 2, fruit: 'apple' },
       { a: 1, b: 3, fruit: 'banana' }]
      fixture.givenOatyArray(initial)
      fixture.whenDataIsPushed(push)
      fixture.thenCountIs(6)
    })
  })

  describe('.get', () => {
    describe('(key, value)', () => {
      context('initialised data', () => {
        it('returns a match', () => {
          const testArray = [
          { a: 1, b: 1, fruit: 'apple' },
          { a: 1, b: 2, fruit: 'apple' },
          { a: 1, b: 3, fruit: 'banana' }]
          fixture.givenOatyArray(testArray)
          fixture.whenGetIsCalled('fruit', 'banana')
          fixture.thenMatchesEquals([{a: 1, b: 3, fruit: 'banana'}])
        })
        it('returns matches', () => {
          const testArray = [
          { a: 1, b: 1, fruit: 'apple' },
          { a: 1, b: 2, fruit: 'apple' },
          { a: 1, b: 3, fruit: 'banana' }]
          fixture.givenOatyArray(testArray)
          fixture.whenGetIsCalled('fruit', 'apple')
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
          fixture.givenOatyArray([])
          fixture.whenDataIsPushed(data)
          fixture.whenGetIsCalled('fruit', 'potato')
          fixture.thenMatchesEquals([{ a: 5, b: 5, fruit: 'potato' }])
        })
      })

      context('querying for non-existent value', () => {
        it('returns undefined', () => {
          const testArray = [{ a: 1, b: 1, fruit: 'apple' }]
          fixture.givenOatyArray(testArray)
          fixture.whenGetIsCalled('fruit', 'carrot')
          fixture.thenMatchesEquals(undefined)
        })
        it('returns custom value', () => {
          const testArray = [{ a: 1, b: 1, fruit: 'apple' }]
          fixture.givenOatyArray(testArray, {noResultsReturns: []})
          fixture.whenGetIsCalled('fruit', 'carrot')
          fixture.thenMatchesEquals([])
        })
      })
    })

    describe('(key)', () => {
      context('initialised data', () => {
        it('returns a match', () => {
          fixture.givenOatyArray([{ a: 5, b: 5, fruit: 'potato' }])
          fixture.whenGetIsCalled('fruit')
          fixture.thenMatchesEquals({potato: [{ a: 5, b: 5, fruit: 'potato' }]})
        })
      })

      context('pushed data', () => {
        it('returns a match', () => {
          fixture.givenOatyArray([])
          fixture.whenDataIsPushed([{ a: 5, b: 5, fruit: 'potato' }])
          fixture.whenGetIsCalled('fruit')
          fixture.thenMatchesEquals({potato: [{ a: 5, b: 5, fruit: 'potato' }]})
        })
      })

      context('querying for initialised data alongside pushed data', () => {
        it('returns a match', () => {
          const testArray = [
            { a: 1, b: 1, fruit: 'apple' },
            { a: 1, b: 2 },
            { a: 1, b: 3 }]
          const data = [
            { a: 5, b: 5 },
            { a: 6, b: 6, fruit: 'courgette' }]
          fixture.givenOatyArray(testArray)
          fixture.whenDataIsPushed(data)
          fixture.whenGetIsCalled('fruit')
          fixture.thenMatchesEquals({
            apple: [{ a: 1, b: 1, fruit: 'apple' }],
            courgette: [{ a: 6, b: 6, fruit: 'courgette' }]})
        })
      })

      context('querying for pushed data alongside initialised data', () => {
        it('returns a match', () => {
          const testArray = [
            { a: 1, b: 1, fruit: 'apple' },
            { a: 1, b: 2, fruit: 'banana' },
            { a: 1, b: 3 }]
          const data = [
            { a: 5, b: 5, fruit: 'potato' },
            { a: 6, b: 6, taste: 'bad' }]
          fixture.givenOatyArray(testArray)
          fixture.whenDataIsPushed(data)
          fixture.whenGetIsCalled('fruit')
          fixture.thenMatchesEquals({
            apple: [{ a: 1, b: 1, fruit: 'apple' }],
            banana: [{ a: 1, b: 2, fruit: 'banana' }],
            potato: [{ a: 5, b: 5, fruit: 'potato' }]})
        })
      })

      context('querying for non-existent key', () => {
        it('returns undefined', () => {
          fixture.givenOatyArray([])
          fixture.whenGetIsCalled('d')
          fixture.thenMatchesEquals(undefined)
        })
      })
    })
  })
})

class Fixture {
  private _oatyArray: OatyArray | undefined

  private _count: number = 0
  private _matches: object[] = []

  public givenOatyArray(data: object[], options: IOptions = {}) {
    this._oatyArray = new OatyArray(data, options)
  }

  public whenDataIsPushed(data: object[]) {
    this._count = this._oatyArray!.push(...data)
  }

  public whenGetIsCalled(key: string, value?: string) {
    this._matches = this._oatyArray!.get(key, value)
  }

  public thenCountIs(count: number) {
    expect(this._count).to.equal(count)
  }

  public thenKeysEquals(keys: string[]) {
    expect(this._oatyArray!.keys).to.deep.equal(keys)
  }

  public thenMatchesEquals(matches: any) {
    expect(this._matches).to.deep.equal(matches)
  }

  public thenOatyArrayExists() {
    // tslint:disable-next-line: no-unused-expression
    expect(this._oatyArray).to.exist
  }

  public thenOriginalsEquals(data: object[]) {
    expect(this._oatyArray!.data).to.deep.equal(data)
  }
}
