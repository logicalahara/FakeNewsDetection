/**
 * Test cases for myMap polyfill
 * This file demonstrates various use cases and edge cases
 */

// Import the standalone function if in Node.js environment
const { myMap } = typeof require !== 'undefined' ? require('./myMapPolyfill') : { myMap: window.myMap };

console.log('=== myMap Polyfill Test Suite ===\n');

// Test 1: Basic mapping
console.log('Test 1: Basic number mapping');
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.myMap(x => x * 2);
console.log('Original:', numbers);
console.log('Doubled:', doubled);
console.log('Pass:', JSON.stringify(doubled) === JSON.stringify([2, 4, 6, 8, 10]));
console.log('');

// Test 2: String transformation
console.log('Test 2: String transformation');
const words = ['hello', 'world', 'javascript'];
const uppercased = words.myMap(word => word.toUpperCase());
console.log('Original:', words);
console.log('Uppercased:', uppercased);
console.log('Pass:', JSON.stringify(uppercased) === JSON.stringify(['HELLO', 'WORLD', 'JAVASCRIPT']));
console.log('');

// Test 3: Using index parameter
console.log('Test 3: Using index parameter');
const items = ['a', 'b', 'c'];
const withIndex = items.myMap((item, index) => `${index}: ${item}`);
console.log('Original:', items);
console.log('With index:', withIndex);
console.log('Pass:', JSON.stringify(withIndex) === JSON.stringify(['0: a', '1: b', '2: c']));
console.log('');

// Test 4: Using array parameter
console.log('Test 4: Using array parameter');
const nums = [10, 20, 30];
const withArrayRef = nums.myMap((num, idx, arr) => num / arr.length);
console.log('Original:', nums);
console.log('Divided by length:', withArrayRef);
console.log('Pass:', JSON.stringify(withArrayRef) === JSON.stringify([10/3, 20/3, 30/3]));
console.log('');

// Test 5: Using thisArg
console.log('Test 5: Using thisArg');
const multiplier = {
  factor: 3,
  multiply: function(x) {
    return x * this.factor;
  }
};
const values = [1, 2, 3];
const multiplied = values.myMap(function(x) {
  return this.multiply(x);
}, multiplier);
console.log('Original:', values);
console.log('Multiplied by 3:', multiplied);
console.log('Pass:', JSON.stringify(multiplied) === JSON.stringify([3, 6, 9]));
console.log('');

// Test 6: Sparse arrays
console.log('Test 6: Sparse arrays');
const sparse = [1, , 3, , 5];  // Array with holes
const mappedSparse = sparse.myMap(x => x * 10);
console.log('Original sparse:', sparse);
console.log('Mapped sparse:', mappedSparse);
console.log('Has holes preserved:', !(1 in mappedSparse) && !(3 in mappedSparse));
console.log('');

// Test 7: Objects transformation
console.log('Test 7: Object transformation');
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];
const names = users.myMap(user => user.name);
console.log('Users:', users);
console.log('Names only:', names);
console.log('Pass:', JSON.stringify(names) === JSON.stringify(['Alice', 'Bob', 'Charlie']));
console.log('');

// Test 8: Empty array
console.log('Test 8: Empty array');
const empty = [];
const mappedEmpty = empty.myMap(x => x);
console.log('Empty array result:', mappedEmpty);
console.log('Pass:', mappedEmpty.length === 0);
console.log('');

// Test 9: Error handling - non-function callback
console.log('Test 9: Error handling - non-function callback');
try {
  [1, 2, 3].myMap('not a function');
  console.log('Pass: false (should have thrown error)');
} catch (e) {
  console.log('Caught error:', e.message);
  console.log('Pass:', e instanceof TypeError);
}
console.log('');

// Test 10: Standalone function
console.log('Test 10: Standalone myMap function');
const arr = [1, 2, 3];
const standaloneResult = myMap(arr, x => x + 10);
console.log('Original:', arr);
console.log('Using standalone myMap:', standaloneResult);
console.log('Pass:', JSON.stringify(standaloneResult) === JSON.stringify([11, 12, 13]));
console.log('');

// Performance comparison (if native map exists)
if (Array.prototype.map) {
  console.log('=== Performance Comparison ===');
  const largeArray = Array.from({ length: 100000 }, (_, i) => i);
  
  console.time('Native map');
  largeArray.map(x => x * 2);
  console.timeEnd('Native map');
  
  console.time('myMap polyfill');
  largeArray.myMap(x => x * 2);
  console.timeEnd('myMap polyfill');
}

console.log('\n=== All tests completed ===');