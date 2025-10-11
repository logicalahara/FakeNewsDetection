/**
 * myMap Polyfill Implementation
 * This polyfill adds a custom map method to the Array prototype
 * that mimics the behavior of the native Array.prototype.map()
 */

// Check if Array.prototype.myMap already exists to avoid overwriting
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function(callback, thisArg) {
    // Type checking - ensure 'this' is not null or undefined
    if (this == null) {
      throw new TypeError('Array.prototype.myMap called on null or undefined');
    }

    // Type checking - ensure callback is a function
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // Convert 'this' to an object (handles primitive values)
    const O = Object(this);

    // Get the length of the array-like object
    // >>> 0 ensures we get a 32-bit unsigned integer
    const len = O.length >>> 0;

    // Create a new array to store the results
    const result = new Array(len);

    // Loop through each element
    for (let i = 0; i < len; i++) {
      // Check if the property exists (handles sparse arrays)
      if (i in O) {
        // Call the callback function with proper context
        // Arguments: current element, index, original array
        result[i] = callback.call(thisArg, O[i], i, O);
      }
    }

    return result;
  };
}

// Alternative implementation as a standalone function
function myMap(array, callback, thisArg) {
  // Type checking
  if (!Array.isArray(array)) {
    throw new TypeError('First argument must be an array');
  }

  if (typeof callback !== 'function') {
    throw new TypeError('Second argument must be a function');
  }

  const result = [];
  
  for (let i = 0; i < array.length; i++) {
    if (i in array) {
      result[i] = callback.call(thisArg, array[i], i, array);
    }
  }

  return result;
}

// Export for use in Node.js/CommonJS environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { myMap };
}