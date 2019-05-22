"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var testArray = [{ a: 1, b: 1, fruit: 'apple' },
    { a: 1, b: 2, fruit: 'apple' },
    { a: 1, b: 3, fruit: 'banana' }];
var results = [];
function time(runs) {
    var oaty = new index_1.OatyArray({ data: testArray });
    var oatyTimes = [];
    var oatyResults = [];
    for (var count = 0; count < runs; count++) {
        var oatyStart = process.hrtime();
        var oatyResult = oaty.get('fruit', 'banana');
        var oatyTime = process.hrtime(oatyStart);
        oatyResults.push(oatyResult);
        oatyTimes.push(getNanoseconds(oatyTime));
    }
    var findTimes = [];
    var findResults = [];
    for (var count = 0; count < runs; count++) {
        var findStart = process.hrtime();
        var findResult = testArray.find(function (o) { return o.fruit === 'banana'; });
        var findTime = process.hrtime(findStart);
        findResults.push([findResult]);
        findTimes.push(getNanoseconds(findTime));
    }
    results.push({ runs: runs, oaty: getAverage(oatyTimes), find: getAverage(findTimes) });
}
function getNanoseconds(hrtime) {
    return hrtime[0] * 1e9 + hrtime[1];
}
function getAverage(values) {
    return values.reduce(function (previous, current) { return current += previous; }) / values.length;
}
time(1);
time(10);
time(100);
time(1000);
time(10000);
// tslint:disable-next-line: no-console
console.log(results);
