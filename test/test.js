const expect = require('chai').expect
const OatyObject = require('../dist/index.js').default

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

describe('OatyObject', () => {
  it('should initialise', () => {
    const oat = new OatyObject(testArray, ['a', 'b', 'fruit'])

    expect(oat).to.exist
  })

  it('should match a search', () => {
    const oat = new OatyObject(testArray, ['fruit'])
    const matches = oat.get('fruit', 'banana')

    expect(matches).to.not.be.undefined
    expect(matches[0]).to.not.be.undefined
    expect(matches[0].b).to.equal(3)
  })
})
