const expect = require('chai').expect
const { OatyArray } = require('../dist/index.js')

const testArray = [{
  a: 1,
  b: 1,
  fruit: 'apple'
}, {
  a: 1,
  b: 2,
  fruit: 'apple'
}, {
  a: 1,
  b: 3,
  fruit: 'banana'
}]

describe('OatyArray', () => {
  it('should initialise', () => {
    const oat = new OatyArray(testArray, ['a', 'b', 'fruit'])

    expect(oat).to.exist
  })

  it('should match a search', () => {
    const oat = new OatyArray(testArray, ['fruit'])
    const matches = oat.get('fruit', 'banana')

    expect(matches).to.not.be.undefined
    expect(matches[0]).to.not.be.undefined
    expect(matches[0].b).to.equal(3)
  })

  it('should let the user query pushed objects', () => {
    const oat = new OatyArray(testArray, ['fruit'])

    oat.push(
      { a: 5, b: 5, fruit: 'potato' },
      { a: 6, b: 6, fruit: 'courgette' }
    )

    const matches = oat.get('fruit', 'potato')

    expect(matches).to.not.be.undefined
    expect(matches[0]).to.not.be.undefined
    expect(matches[0].b).to.equal(5)
  })

  it('push function should return count', () => {
    const oat = new OatyArray(testArray, ['fruit'])

    const newCount = oat.push(
      { a: 5, b: 5, fruit: 'potato' },
      { a: 6, b: 6, fruit: 'courgette' }
    )

    expect(newCount).to.equal(testArray.length + 2)
  })
})
