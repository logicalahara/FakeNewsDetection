# myMap Polyfill

A JavaScript polyfill implementation of the Array.prototype.map() method.

## Overview

This polyfill provides a custom implementation of the `map` method called `myMap`. It replicates the behavior of the native `Array.prototype.map()` method, allowing you to transform array elements by applying a callback function to each element.

## Features

- ✅ Full compatibility with native `map()` behavior
- ✅ Support for callback function with all three parameters (element, index, array)
- ✅ Support for `thisArg` parameter
- ✅ Handles sparse arrays correctly
- ✅ Proper error handling and type checking
- ✅ Available as both prototype method and standalone function

## Installation

Simply include the polyfill file in your project:

```javascript
// Node.js
require('./myMapPolyfill');

// Browser
<script src="myMapPolyfill.js"></script>
```

## Usage

### Basic Usage

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.myMap(x => x * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

### Using Index and Array Parameters

```javascript
const letters = ['a', 'b', 'c'];
const result = letters.myMap((letter, index, array) => {
  return `${letter} is at index ${index} of ${array.length} items`;
});
```

### Using thisArg

```javascript
const multiplier = {
  factor: 10,
  multiply: function(x) {
    return x * this.factor;
  }
};

const numbers = [1, 2, 3];
const result = numbers.myMap(function(x) {
  return this.multiply(x);
}, multiplier);
// result: [10, 20, 30]
```

### Standalone Function

```javascript
const { myMap } = require('./myMapPolyfill');

const array = [1, 2, 3];
const result = myMap(array, x => x * 2);
```

## API

### Array.prototype.myMap(callback[, thisArg])

#### Parameters

- **callback**: Function that produces an element of the new array, taking three arguments:
  - **currentValue**: The current element being processed
  - **index** (optional): The index of the current element
  - **array** (optional): The array myMap was called upon
- **thisArg** (optional): Value to use as `this` when executing callback

#### Return Value

A new array with each element being the result of the callback function.

## Edge Cases Handled

1. **Sparse Arrays**: Maintains holes in sparse arrays
2. **Type Checking**: Throws TypeError for invalid inputs
3. **Empty Arrays**: Returns empty array without calling callback
4. **Non-array Objects**: Works with array-like objects when used via call/apply

## Files Included

- `myMapPolyfill.js` - The main polyfill implementation
- `myMapPolyfill.test.js` - Comprehensive test suite
- `myMapExample.js` - Practical usage examples
- `myMapPolyfill.md` - This documentation

## Running Tests

```bash
node myMapPolyfill.test.js
```

## Running Examples

```bash
node myMapExample.js
```

## Browser Compatibility

The polyfill uses ES5-compatible syntax and should work in all modern browsers and IE9+.

## License

This polyfill is provided as-is for educational and practical use.