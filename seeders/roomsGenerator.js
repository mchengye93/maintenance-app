const fs = require('fs');

const writeStream = fs.createWriteStream('rooms.csv');

// node --max-old-space-size=8192 roomsGenerator.js

writeStream.write('id,vip,parking\n');


for (let i = 1; i <= 100; i += 1) {
  const vip = (i > 90);
  const parking = true;


  const roomRecord = `${i},${vip},${parking}\n`;


  writeStream.write(roomRecord);
}
writeStream.end();
