# Nested To Flat

A utility to flatten deeply nested objects based on specified keys.

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![license: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Install

```sh
$ npm install nested-to-flat
```

## Usage

```js
const nestedToFlat = require("nested-to-flat");

const tree = {
  nom: "carlita",
  age: 60,
  enfant: {
    nom: "rosa",
    age: 42,
    enfant: {
      nom: "mamadou",
      age: 16
    }
  }
};

const triggerKeys = ['enfant'];
const flattenedData = nestedToFlat(triggerKeys, tree);

console.log(flattenedData);
```

## API

### nestedToFlat(triggerKeys, object) ⇒ `Object[]`

Flatten an object based on the given keys.

**Returns**: `Object[]` - Flattened version of the object  

| Param        | Type       | Description                                      |
| ------------ | ---------- | ------------------------------------------------ |
| triggerKeys  | `String[]` | Keys used to flat the given object.              |
| object       | `Object`   | Object to flatten.                               |

**Example**

```js
const nestedToFlat = require("nested-to-flat");

const tree = {
  nom: "carlita",
  age: 60,
  enfant: {
    nom: "rosa",
    age: 42,
    enfant: {
      nom: "mamadou",
      age: 16
    }
  }
};

const triggerKeys = ['enfant'];
const flattenedData = nestedToFlat(triggerKeys, tree);

console.log(flattenedData);
// Output:
// [
//   {
//     nom: "carlita",
//     age: 60  
//   },
//   {
//     nom: "rosa",
//     age: 42  
//   },
//   {
//     nom: "mamadou",
//     age: 16
//   }
// ]
```

## Testing

To run the tests for the utility, use:

```sh
$ npm test
```

To check test coverage, use:

```sh
$ npm run test:coverage
```

## License

MIT © [muceres](https://forgetheweb.eu)