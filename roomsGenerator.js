var faker = require('faker');
const fs = require('fs'); 

var writeStream = fs.createWriteStream('rooms.csv');

//node --max-old-space-size=8192 second.js

writeStream.write('id,vip,parking\n');


for (var i = 1; i <= 100; i++) {
  var vip = (i > 90) ? true: false;
  var parking = true;
  
  
  var roomRecord = i + ',' + vip + ',' + parking + '\n';
  // write some data with a base64 encoding
  //   var stockRecord = {
  //     id: i,
  //     vip: vip,
  //     parking: parking,
  //   };

  writeStream.write(roomRecord);


}
writeStream.end();



