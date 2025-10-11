/**
 * Practical examples of using the myMap polyfill
 * These examples demonstrate real-world use cases
 */

// Load the polyfill
require('./myMapPolyfill');

console.log('=== myMap Polyfill Examples ===\n');

// Example 1: Data transformation
console.log('Example 1: Transform API response data');
const apiResponse = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 30 },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 25 },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 35 }
];

const formattedUsers = apiResponse.myMap(user => ({
  id: user.id,
  fullName: `${user.firstName} ${user.lastName}`,
  isAdult: user.age >= 18
}));

console.log('Formatted users:', formattedUsers);
console.log('');

// Example 2: Calculate prices with tax
console.log('Example 2: Calculate prices with tax');
const products = [
  { name: 'Laptop', price: 999.99 },
  { name: 'Mouse', price: 29.99 },
  { name: 'Keyboard', price: 79.99 }
];

const TAX_RATE = 0.08; // 8% tax
const productsWithTax = products.myMap(product => ({
  ...product,
  tax: (product.price * TAX_RATE).toFixed(2),
  total: (product.price * (1 + TAX_RATE)).toFixed(2)
}));

console.log('Products with tax:');
productsWithTax.forEach(p => {
  console.log(`  ${p.name}: $${p.price} + $${p.tax} tax = $${p.total}`);
});
console.log('');

// Example 3: Create HTML elements
console.log('Example 3: Generate HTML from data');
const menuItems = ['Home', 'About', 'Services', 'Contact'];
const htmlElements = menuItems.myMap(item => 
  `<li><a href="/${item.toLowerCase()}">${item}</a></li>`
);

console.log('Generated HTML:');
console.log('<ul>');
htmlElements.forEach(html => console.log('  ' + html));
console.log('</ul>');
console.log('');

// Example 4: Process form data
console.log('Example 4: Process and validate form data');
const formFields = [
  { name: 'email', value: 'user@example.com', type: 'email' },
  { name: 'age', value: '25', type: 'number' },
  { name: 'username', value: 'john_doe', type: 'text' }
];

const processedFields = formFields.myMap(field => {
  let processed = { ...field, valid: true, error: null };
  
  switch(field.type) {
    case 'email':
      processed.valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
      if (!processed.valid) processed.error = 'Invalid email format';
      break;
    case 'number':
      processed.value = Number(field.value);
      processed.valid = !isNaN(processed.value);
      if (!processed.valid) processed.error = 'Must be a number';
      break;
  }
  
  return processed;
});

console.log('Processed form fields:');
processedFields.forEach(field => {
  console.log(`  ${field.name}: ${field.value} (${field.valid ? 'Valid' : 'Invalid: ' + field.error})`);
});
console.log('');

// Example 5: Data aggregation
console.log('Example 5: Calculate statistics from data');
const scores = [85, 92, 78, 95, 88, 76, 90];
const statistics = scores.myMap((score, index, array) => ({
  score: score,
  index: index,
  aboveAverage: score > array.reduce((a, b) => a + b) / array.length,
  grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F'
}));

console.log('Score statistics:');
statistics.forEach(stat => {
  console.log(`  Score ${stat.score}: Grade ${stat.grade}, Above average: ${stat.aboveAverage}`);
});
console.log('');

// Example 6: Chaining with other array methods
console.log('Example 6: Chaining myMap with other methods');
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = numbers
  .myMap(n => n * n)           // Square each number
  .filter(n => n % 2 === 0)    // Keep only even squares
  .myMap(n => Math.sqrt(n));   // Take square root

console.log('Original numbers:', numbers);
console.log('Even numbers after square and square root:', result);
console.log('');

console.log('=== Examples completed ===');