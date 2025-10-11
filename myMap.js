/**
 * myMap - A polyfill implementation of Array.prototype.map()
 * 
 * This function mimics the behavior of the native map() method,
 * creating a new array with the results of calling a provided function
 * on every element in the calling array.
 */

// Polyfill implementation as a standalone function
function myMap(array, callback, thisArg) {
  // Validate inputs
  if (array == null) {
    throw new TypeError('Array is null or undefined');
  }
  
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function');
  }
  
  // Convert to object (handles array-like objects)
  const obj = Object(array);
  const len = obj.length >>> 0; // Convert to unsigned 32-bit integer
  
  // Create new array to store results
  const result = new Array(len);
  
  // Iterate through array
  for (let i = 0; i < len; i++) {
    // Check if property exists (handles sparse arrays)
    if (i in obj) {
      // Call callback with thisArg context
      result[i] = callback.call(thisArg, obj[i], i, obj);
    }
  }
  
  return result;
}

// Alternative: Adding as a polyfill to Array.prototype
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function(callback, thisArg) {
    // Validate inputs
    if (this == null) {
      throw new TypeError('this is null or undefined');
    }
    
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }
    
    // Convert to object
    const obj = Object(this);
    const len = obj.length >>> 0;
    
    // Create new array to store results
    const result = new Array(len);
    
    // Iterate through array
    for (let i = 0; i < len; i++) {
      // Check if property exists (handles sparse arrays)
      if (i in obj) {
        result[i] = callback.call(thisArg, obj[i], i, obj);
      }
    }
    
    return result;
  };
}

// Example usage and tests
console.log('=== Testing myMap Polyfill ===\n');

// Test 1: Basic usage
const numbers = [1, 2, 3, 4, 5];
const doubled = myMap(numbers, (num) => num * 2);
console.log('Test 1 - Double numbers:');
console.log('Input:', numbers);
console.log('Output:', doubled);
console.log('Expected: [2, 4, 6, 8, 10]\n');

// Test 2: Using Array.prototype.myMap
const squared = numbers.myMap((num) => num * num);
console.log('Test 2 - Square numbers:');
console.log('Input:', numbers);
console.log('Output:', squared);
console.log('Expected: [1, 4, 9, 16, 25]\n');

// Test 3: With index parameter
const withIndex = numbers.myMap((num, index) => `${index}: ${num}`);
console.log('Test 3 - With index:');
console.log('Output:', withIndex);
console.log('Expected: ["0: 1", "1: 2", "2: 3", "3: 4", "4: 5"]\n');

// Test 4: With thisArg
const multiplier = {
  factor: 10,
  multiply: function(num) {
    return num * this.factor;
  }
};
const multiplied = numbers.myMap(function(num) {
  return num * this.factor;
}, multiplier);
console.log('Test 4 - Using thisArg:');
console.log('Output:', multiplied);
console.log('Expected: [10, 20, 30, 40, 50]\n');

// Test 5: Sparse arrays
const sparse = [1, , 3, , 5]; // Array with empty slots
const sparseMapped = sparse.myMap((num) => num * 2);
console.log('Test 5 - Sparse array:');
console.log('Output:', sparseMapped);
console.log('Has index 1:', 1 in sparseMapped); // Should be false
console.log('Expected: [2, empty, 6, empty, 10]\n');

// Test 6: Complex objects
const users = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 }
];
const names = users.myMap((user) => user.name);
console.log('Test 6 - Extract property:');
console.log('Output:', names);
console.log('Expected: ["Alice", "Bob", "Charlie"]\n');

// Export for use in other modules (Node.js)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { myMap };
}
