const fs = require('fs');

const writeStream = fs.createWriteStream('categories.csv');

// node --max-old-space-size=8192 roomsGenerator.js

writeStream.write('id,category\n');

const categories = ['', 'Electrical', 'Plumbing', 'Fixture', 'Decoration', 'Furniture'];
for (let i = 1; i <= 5; i += 1) {
  const category = categories[i];


  const categoryRecord = `${i},${category}\n`;


  writeStream.write(categoryRecord);
}
writeStream.end();
