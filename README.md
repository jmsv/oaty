<p align="center">
  <img width=320 src="https://repository-images.githubusercontent.com/184661355/24a79180-7409-11e9-8155-1e30fa6df50a" alt="oaty" />
</p>
<p align="center">
  <strong>Object Array Transposer(y)</strong> - JS objects with multiple key/value structures
</p>

## Why?

The idea ([j-m](https://github.com/j-m)'s) was to find a way of being able to get values from an array of objects in O(1) time, in an environment where memory isn't an issue.

For example, I could have the following JS object:

```javascript
const food = [
  {
    id: 1,
    name: "apple",
    type: "fruit",
  },
  {
    id: 2,
    name: "orange",
    type: "fruit",
  },
  {
    id: 3,
    name: "broccoli",
    type: "vegetable",
  },
];
```

As-is, to get the item where the id is 3, I'd use `food.find(x => x.id === 3)` or similar.

If the array was transposed to use `id` as object keys, the resultant object would look like the following:

```javascript
const foodById = {
  1: {
    id: 1,
    name: "apple",
    type: "fruit",
  },
  2: {
    id: 2,
    name: "orange",
    type: "fruit",
  },
  3: {
    id: 3,
    name: "broccoli",
    type: "vegetable",
  },
};
```

This way, we can get the food with the `id` of 3 with `foodById[3]`.

However, we don't know that object keys will all be unique, so objects should be placed in arrays. For example:

```javascript
const foodByType = {
  fruit: [
    {
      id: 1,
      name: "apple",
      type: "fruit",
    },
    {
      id: 2,
      name: "orange",
      type: "fruit",
    },
  ],
  vegetable: [
    {
      id: 3,
      name: "broccoli",
      type: "vegetable",
    },
  ],
};
```

Now, to get an array of fruit, rather than using `food.filter(f => f.type === 'fruit')` we can just use `foodByType['fruit']`.

---

> **For data that changes frequently, this is a bad approach since transposing the data to use different key values is expensive.**

However, for data that is assigned once (e.g. when a server first starts running) or assigned relatively infrequently (e.g. polling a database) this idea should be far less CPU-intensive than frequently searching the array using `filter`, `find`, or manually.

## Getting Started

This library's default export is `OatyArray`. Initialise it as such:

```javascript
const oatyFood = new OatyArray(food, { keys: ["id", "type"] });
```

In the above case, `food` is the initial array of items and `['id', 'type']` is the array of keys you want to be able to query.

The `OatyArray` constructor generates the transposed caches.

To query data, use the `get` method:

```javascript
const fruitArray = oatyFood.get("type", "fruit");
```

The above is effectively the same as `foodByType['fruit']` in the above examples

## Development

`oaty` is built with Typescript

To get started, run `npm install` to install dependencies.

- Run tests: `npm test`
- Build: `npm run build`

Feel free to open Issues/PRs with suggestions/problems/improvements.

Library is versioned as-per the [semver](https://semver.org) standard.

### Maintainers

- James Vickery - [jmsv](https://github.com/jmsv)
- Jonathan Marsh - [j-m](https://github.com/j-m)

### Changelog

#### `1.0.0`

- Added extra type inference and enforcement to Oaty, this means that an array can be initialised `new OatyArray([{ myKey: "myValue" }])` without needing to provide a type.
- `keys` input is now enforced to a subset of the keys of the given type
- `keys` input will now be used to enforce that only valid objects are transposed by Oaty
- `.keys` will now always return either an array containing all the auto transposed keys, or an array of the configured keys, and is now type correct.
- Oaty will now enforce the correct keys are the objects of `.push` meaning that an error will be thrown at compile time if an invalid object is being passed to Oaty.
- Updated overloads on `.get` to return the correct types depending on usage
- Updated to `typescript@3.8`
- Added `tsd` tests

#### `0.4.0`

- Oaty can now be initialised with `new OatyArray<T>()` so that `.get` , `.data`, and `.transposed` return data of type `T`. This is completely optional as `T` defaults to `any`.
- Removed `missingKeyReturns` and `noResultsReturns` options.
- Exported a new type for the `_transposed` property.
- Expanded the ternary conditions to improve readability.
- Made the `data` constructor param optional and default to `[]`.
- When a key is not transposed and `.get` searches for that key, it will now throw a `ReferenceError`.
- Added NYC and increased tests to 100% coverage.

#### `0.3.0`

- Added `get`s for `data`, `keys`, and `transposed`
- Made `keys` optional - will transpose every (root) key in an object
- Added two options to change the return value for when they key or value of `.get()` is undefined
- Renamed `original` to `data`
- `.get()` can now retrieve all objects that have a key, like `.get('fruit')`
- Added simple benchmark
- Added more tests

#### `0.2.1`

- Fixed `.get()` method type (`object[]`)

#### `0.2.0`

- Renamed `OatyObject` to `OatyArray`, since it's intended as an array alternative, rather than an object alternative
- Named export, rather than default export

#### `0.1.0`

- Added `.push` function

#### `0.0.0`

- Initial proof of concept
