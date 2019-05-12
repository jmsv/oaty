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

function time(runs) {
    var oaty = new OatyArray({data: testArray});
  
    var oatyTimes = [];
    var oatyResults = [];
    for (var count = 0; count < runs; count++) {
      const oatyStart = process.hrtime();
      const oatyResult= oaty.get('fruit', 'banana');
      const oatyTime = process.hrtime(oatyStart);
      oatyResults.push(oatyResult);
      oatyTimes.push(getNanoseconds(oatyTime));
    }
  
    var findTimes = [];
    var findResults = [];
    for (var count = 0; count < runs; count++) {
      const findStart = process.hrtime();
      const findResult = testArray.find(o => o.fruit === 'banana')
      const findTime = process.hrtime(findStart);
      findResults.push([findResult]);
      findTimes.push(getNanoseconds(findTime));
    }
  
    results.push({runs: runs, oaty: getAverage(oatyTimes), find: getAverage(findTimes)})
  };
  
  function getNanoseconds(hrtime) {
    return hrtime[0] * 1e9 + hrtime[1];
  }
  
  function getAverage(values) {
    return values.reduce((previous, current) => current += previous) / values.length;
  }
  
  time(1)
  time(10)
  time(100)
  time(1000)
  time(10000)
  console.log(results)