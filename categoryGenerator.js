const fs = require('fs');

const writeStream = fs.createWriteStream('categories.csv');

// node --max-old-space-size=8192 roomsGenerator.js

writeStream.write('id,category\n');

const categories = ['', 'Electrical', 'Plumbing', 'Fixture', 'Decoration', 'Furniture'];
for (let i = 1; i <= 5; i += 1) {
  const category = categories[i];


  const categoryRecord = `${i},${category}\n`;
  // write some data with a base64 encoding
  //   var roomRecord = {
  //     id: i,
  //     vip: vip,
  //     parking: parking,
  //   };

  writeStream.write(categoryRecord);
}
writeStream.end();
