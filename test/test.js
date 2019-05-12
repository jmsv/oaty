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
    const oat = new OatyArray({});
    expect(oat).to.exist;
  });

  it('should initialise with keys', () => {
    const oat = new OatyArray({keys: ['a', 'b', 'fruit']});
    expect(oat).to.exist;
  });

  it('should initialise with data', () => {
    const oat = new OatyArray({data: testArray});
    expect(oat).to.exist;
  });

  it('should initialise with keys and data', () => {
    const oat = new OatyArray({keys: ['a', 'b', 'fruit'], data: testArray});
    expect(oat).to.exist;
  });

  it('push function should return count', () => {
    const oat = new OatyArray({data: testArray, keys: ['fruit']});
    const newCount = oat.push(
      { a: 5, b: 5, fruit: 'potato' },
      { a: 6, b: 6, fruit: 'courgette' }
    );
    expect(newCount).to.equal(testArray.length + 2);
  });

  it('should match a search', () => {
    const oat = new OatyArray({data: testArray, keys: ['fruit']});
    const matches = oat.get('fruit', 'banana');
    expect(matches).to.deep.equal([{a: 1, b: 3, fruit: 'banana'}]);
  });

  it('should let the user query pushed objects', () => {
    const oat = new OatyArray({data: testArray, keys: ['fruit']});
    oat.push(
      { a: 5, b: 5, fruit: 'potato' },
      { a: 6, b: 6, fruit: 'courgette' }
    );
    const matches = oat.get('fruit', 'potato');
    expect(matches).to.deep.equal([{ a: 5, b: 5, fruit: 'potato' }]);
  })

  it('oaty should be faster than find', () => {
    var oaty = new OatyArray({data: testArray});

    const oatyStart = process.hrtime();
    const oatyResult= oaty.get('fruit', 'banana');
    const oatyTime = process.hrtime(oatyStart);

    const findStart = process.hrtime();
    const findResult = testArray.find(o => o.fruit === 'banana')
    const findTime = process.hrtime(findStart);

    expect(oatyTime[0] * 1e9 + oatyTime[1]).to.be.lessThan(findTime[0] * 1e9 + findTime[1]);
    expect(oatyResult[0]).to.deep.equal(findResult);

    console.log(`Oaty took ${oatyTime[0] * 1e9 + oatyTime[1]} nanoseconds and find took ${findTime[0] * 1e9 + findTime[1]}`)
  });
});
