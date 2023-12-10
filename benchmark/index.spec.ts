import { OatyArray } from "../index";

const testArray = [
  { a: 1, b: 1, fruit: "apple" },
  { a: 1, b: 2, fruit: "apple" },
  { a: 1, b: 3, fruit: "banana" },
];

const results: any[] = [];

function time(runs: number) {
  const oaty = new OatyArray(testArray);

  const oatyTimes: number[] = [];
  const oatyResults = [];
  for (let count = 0; count < runs; count++) {
    const oatyStart = process.hrtime();
    const oatyResult = oaty.get("fruit", "banana");
    const oatyTime = process.hrtime(oatyStart);
    oatyResults.push(oatyResult);
    oatyTimes.push(getNanoseconds(oatyTime));
  }

  const findTimes: number[] = [];
  const findResults = [];
  for (let count = 0; count < runs; count++) {
    const findStart = process.hrtime();
    const findResult = testArray.find((o) => o.fruit === "banana");
    const findTime = process.hrtime(findStart);
    findResults.push([findResult]);
    findTimes.push(getNanoseconds(findTime));
  }

  results.push({
    runs,
    oaty: getAverage(oatyTimes),
    find: getAverage(findTimes),
  });
}

function getNanoseconds(hrtime: [number, number]): number {
  return hrtime[0] * 1e9 + hrtime[1];
}

function getAverage(values: number[]) {
  return (
    values.reduce((previous, current) => (current += previous)) / values.length
  );
}

time(1);
time(10);
time(100);
time(1000);
time(10000);
// tslint:disable-next-line: no-console
console.log(results);
