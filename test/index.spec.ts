import { expect } from 'chai'
import { Options, OatyArray, Transposed } from '../index'

class Dummy {
  public data: string = 'hello'
}

let fixture: Fixture

describe('OatyArray', () => {
  beforeEach(() => {
    fixture = new Fixture()
  })
  describe('new', () => {
    context('()', () => {
      it('initialises', () => {
        fixture.givenOatyArray()
        fixture.thenOatyArrayExists()
        fixture.thenOriginalsEquals([])
      })
    })

    context('([])', () => {
      it('initialises', () => {
        fixture.givenOatyArray([])
        fixture.thenOatyArrayExists()
        fixture.thenOriginalsEquals([])
      })
    })

    context('([...]})', () => {
      it('initialises', () => {
        const initial = [
         { a: 1, b: 1, fruit: 'apple' },
         { a: 1, b: 3, fruit: 'banana' }, 
         { a: 2, b: 4, food: 'yum' }
        ]
        fixture.givenOatyArray(initial)
        fixture.thenOatyArrayExists()
        fixture.thenOriginalsEquals(initial)
        fixture.thenKeysEquals(["a", "b", "fruit", "food"])
      })
    })

    context('([], {keys})', () => {	
      it('initialises', () => {	
        fixture.givenOatyArray([], {keys: ['a', 'b', 'fruit']})	
        fixture.thenOatyArrayExists()	
        fixture.thenKeysEquals(['a', 'b', 'fruit'])	
      })	
    });

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

  describe('.keys', () => {	
    context('with initialised data', () => {	
      it('returns initialised data', () => {	
        fixture.givenOatyArray([], {keys: ['a']})	
        fixture.thenKeysEquals(['a'])	
      })	
    })	
  })

  describe('.length', () => {
    context('with initialised data', () => {
      it('returns initialised data', () => {
        const initial = [{ a: 1, b: 1, fruit: 'apple' }]
        fixture.givenOatyArray(initial)
        fixture.thenLengthEquals(1)
      })
    })
  })

  describe('.data', () => {
    context('with initialised data', () => {
      it('returns initialised data', () => {
        const initial = [{ a: 1, b: 1, fruit: 'apple' }]
        fixture.givenOatyArray(initial)
        fixture.thenDataEquals(initial)
      })
    })
  })

  describe('.transposed', () => {
    context('with initialised data', () => {
      it('returns initialised data', () => {
        const initial = [{ a: 1, b: 2}]
        fixture.givenOatyArray(initial)
        fixture.thenTransposedEquals({
          a: {1: [{a: 1, b: 2}]},
          b: {2: [{a: 1, b: 2}]},
        })
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

    it('transposes only .keys', () => {	
      const keys = ['fruit']	
      const push = [	
       { a: 5, b: 5, fruit: 'potato' },	
       { a: 6, b: 6, fruit: 'courgette' }]	
      fixture.givenOatyArray([], {keys})	
      fixture.whenDataIsPushed(push)	
      fixture.thenTransposedEquals({	
        fruit: {	
          courgette: [{ a: 6, b: 6, fruit: 'courgette' }],	
          potato: [{ a: 5, b: 5, fruit: 'potato' }],	
        },	
      })	
    })	

    it('does not tranpose objects with missing .keys', () => {	
      const keys = ['fruit']	
      const push = [	
       { a: 5, b: 5 },	
       { a: 6, b: 6 }]	
      fixture.givenOatyArray([], {keys})	
      fixture.whenDataIsPushed(push)	
      fixture.thenTransposedEquals({})	
    })
  })

  describe('.get', () => {
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
        it('throws a ReferenceError', () => {	
          const testArray = [{ a: 1, b: 1}]	
          fixture.givenOatyArray(testArray)	
          expect(() => {	
            fixture.whenGetIsCalled('fruit')	
          }).to.throw(ReferenceError, `The key 'fruit' has not been transposed`)	
        })	
      })
    })
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

      context('querying for non-existent key', () => {	
        it('throws a ReferenceError', () => {	
          const testArray = [{ a: 1, b: 1}]	
          fixture.givenOatyArray(testArray)	
          expect(() => {	
            fixture.whenGetIsCalled('fruit', 'carrot')	
          }).to.throw(ReferenceError, `The key 'fruit' has not been transposed`)	
        })	
      })

      context('querying for non-existent value', () => {
        it('returns undefined', () => {
          const testArray = [{ a: 1, b: 1, fruit: 'apple' }]
          fixture.givenOatyArray(testArray)
          fixture.whenGetIsCalled('fruit', 'carrot')
          fixture.thenMatchesEquals(undefined)
        })
      })
    })
  })

  describe('<T>', () => {
    describe('.data', () => {
      context('initalised data', () => {
        it('returns data of type T[]', () => {
          fixture.givenOatyArray([new Dummy()])
          fixture.thenDataEquals([new Dummy()], 'Dummy')
        })
      })

    })
    describe('.get', () => {
      describe('initialised data', () => {
        it('returns data of type T[]', () => {
          fixture.givenOatyArray([new Dummy()])
          fixture.whenGetIsCalled('data', 'hello')
          fixture.thenMatchesEquals([new Dummy()], 'Dummy')
        })
      })
    })

    describe('.transposed', () => {
      describe('initialised data', () => {
        it('returns data of type [T]', () => {
          fixture.givenOatyArray([new Dummy()])
          fixture.thenTransposedEquals({
            data: {
              hello: [
                new Dummy(),
              ],
            },
          }, 'Dummy')
        })
      })
    })
  })
})

// tslint:disable-next-line: max-classes-per-file
class Fixture {
  private _oatyArray: OatyArray<any, any> | undefined

  private _count: number | undefined
  private _matches: { [key: string]: [any] } | any[] | undefined

  public givenOatyArray(data?: any[], options?: Options<any>) {
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

  public thenLengthEquals(length: number) {
    expect(this._oatyArray!.length).to.equal(length)
  }
  public thenDataEquals<T>(data: T, type?: string) {
    expect(this._oatyArray!.data).to.deep.equal(data)
    if (type === 'Dummy') {
      expect(this._oatyArray!.data[0]).to.be.an.instanceOf(Dummy)
    }
  }

  public thenTransposedEquals<T, K extends keyof T>(transposed: Transposed<T, K>, type?: string) {
    expect(this._oatyArray!.transposed).to.deep.equal(transposed)
    if (type === 'Dummy') {
      expect((this._oatyArray!.transposed! as unknown as any).data!.hello![0]).to.be.an.instanceOf(Dummy)
    }
  }

  public thenMatchesEquals<T>(matches: T, type?: string) {
    expect(this._matches).to.deep.equal(matches)
    if (type === 'Dummy') {
      expect((this._matches as any)[0]).to.be.an.instanceOf(Dummy)
    }
  }

  public thenOatyArrayExists() {
    // tslint:disable-next-line: no-unused-expression
    expect(this._oatyArray).to.exist
  }

  public thenOriginalsEquals(data: object[]) {
    expect(this._oatyArray!.data).to.deep.equal(data)
  }
}
