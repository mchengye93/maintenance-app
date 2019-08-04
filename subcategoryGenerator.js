const fs = require('fs');

const writeStream = fs.createWriteStream('subcategories.csv');

// node --max-old-space-size=8192 sub

writeStream.write('id,category\n');

const subCategories = ['',
  ['Telephone', 'Airconditioner', 'Bathroom Lights', 'Disco Lights', 'TV', 'TV Remote Control',
    'Room Light', 'Internet'],
  ['Sink', 'Toilet', 'Shower', 'Jacuzzi', 'Hot Water'],
  ['Floor Tile', 'Entrance Door', 'Bathroom Door', 'Garage Parking Door'],
  ['Ceramics', 'Ceiling', 'Walls', 'Paintings'],
  ['Sofa', 'Bed']];
let count = 1;
for (let i = 1; i <= 5; i += 1) {
  const categoryId = i;
  for (let x = 0; x < subCategories[i].length; x += 1) {
    const subcategory = subCategories[i][x];
    const subcategoryRecord = `${count},${categoryId},${subcategory}\n`;
    count += 1;
    writeStream.write(subcategoryRecord);
  }
}
writeStream.end();
