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
  describe('Constructor', () => {
    it('should initialise', () => {
      const oat = new OatyArray({}) 
      expect(oat).to.exist 
    }) 

    it('should initialise with data', () => {
      const oat = new OatyArray({data: testArray}) 
      expect(oat).to.exist 
    }) 

    it('should initialise with keys', () => {
      const oat = new OatyArray({keys: ['a', 'b', 'fruit']}) 
      expect(oat).to.exist 
    }) 

    it('should initialise with data and keys', () => {
      const oat = new OatyArray(testArray, {keys: ['a', 'b', 'fruit']}) 
      expect(oat).to.exist 
    }) 
  })

  describe('Push', () => {
    it('push function should return count', () => {
      const oat = new OatyArray(testArray, {keys: ['fruit']}) 
      const newCount = oat.push(
        { a: 5, b: 5, fruit: 'potato' },
        { a: 6, b: 6, fruit: 'courgette' }
      ) 
      expect(newCount).to.equal(testArray.length + 2) 
    }) 
  })

  describe('Find', () => {
    it('should match a search', () => {
      const oat = new OatyArray(testArray, {keys: ['fruit']}) 
      const matches = oat.get('fruit', 'banana') 
      expect(matches).to.deep.equal([{a: 1, b: 3, fruit: 'banana'}]) 
    }) 

    it('should let the user query pushed objects', () => {
      const oat = new OatyArray(testArray, {keys: ['fruit']}) 
      oat.push(
        { a: 5, b: 5, fruit: 'potato' },
        { a: 6, b: 6, fruit: 'courgette' }
      ) 
      const matches = oat.get('fruit', 'potato') 
      expect(matches).to.deep.equal([{ a: 5, b: 5, fruit: 'potato' }]) 
    })
  })
}) 
