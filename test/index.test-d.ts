import { OatyArray } from "..";
import { expectType, expectError } from "tsd";

const myArray = new OatyArray([{ test: 1, test1: 2 }], {
  keys: ["test", "test1"],
});

expectType<("test" | "test1")[]>(myArray.keys);
expectType<{ test: number; test1: number }[] | undefined>(
  myArray.get("test", 1)
);
expectType<{ test: number; test1: number }[] | undefined>(
  myArray.get("test")[1]
);

// "test" can never be a string, so throw an error
expectError(myArray.get("test", "something not a number"));
// this key is not transposed, so a compile time error should be thrown
expectError(myArray.get("somethingNotTransposed", "a"));
expectError(myArray.push({ test1: 1, test: "a" }));
myArray.push({ test1: 1, test: 1 });

const myArray2 = new OatyArray(undefined, { keys: ["1", "2", "3"] });
expectType<("1" | "2" | "3")[]>(myArray2.keys);

// 3 is a required key
expectError(myArray2.push({ 1: "a", 2: "a" }));
myArray2.push({ 1: "a", 2: "a", 3: 1, test1: 1, any: "something" });

const myArray3 = new OatyArray();
myArray3.push({ a: 1, b: 1, c: 1, anything: "hello" });
expectType<
  | ({ [x: string]: any; [x: number]: any } & {
      [x: string]: any;
      [x: number]: any;
    })[]
  | undefined
>(myArray3.get("a", 1));
expectType<(string | number | symbol)[]>(myArray3.keys);

const myArray4 = new OatyArray(
  [
    { key1: 1, key2: 2 },
    { key1: 2, key2: 3 },
  ] as const,
  { keys: ["key1", "key2"] }
);

// `key1` is never 5, so throw a compile time error
expectError(myArray4.get("key1", 5));
expectType<
  | (
      | { readonly key1: 1; readonly key2: 2 }
      | { readonly key1: 2; readonly key2: 3 }
    )[]
  | undefined
>(myArray4.get("key1", 1));
expectType<{
  1:
    | (
        | { readonly key1: 1; readonly key2: 2 }
        | { readonly key1: 2; readonly key2: 3 }
      )[]
    | undefined;
  2:
    | (
        | { readonly key1: 1; readonly key2: 2 }
        | { readonly key1: 2; readonly key2: 3 }
      )[]
    | undefined;
}>(myArray4.get("key1"));

// Keys must be a subset of the available keys
expectError(new OatyArray([{ a: 1, b: 2 }], { keys: ["f"] }));

const myArray5 = new OatyArray([{ key1: "something", key3: "hello" }], {
  keys: ["key1"],
});
expectType<"key1"[]>(myArray5.keys);

const myArray6 = new OatyArray([{ a: 1 }, { b: 2 }]);
expectType<("a" | "b")[]>(myArray6.keys);
