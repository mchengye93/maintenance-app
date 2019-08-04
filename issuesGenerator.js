var faker = require('faker');
const fs = require('fs'); 

var writeStream = fs.createWriteStream('rooms.csv');

//node --max-old-space-size=8192 second.js

writeStream.write('id,roomId,category,subcategory,date, photoUrl,description,cost,dateFixed\n');


for (var i = 1; i <= 100; i++) {
  var roomId = faker.random.number({min:1, max:5});
  var parking = true;
  
  
  var issueRecord = i + ',' + vip + ',' + parking + '\n';
  // write some data with a base64 encoding
  //   var stockRecord = {
  //     id: i,
  //     roomId: roomId,
  //     parking: parking,
  //   };

//   CREATE TABLE issues (
//     id serial PRIMARY KEY,
//     roomId INT NOT NULL,
//     category INT NOT NULL,
//     subcategory INT NOT NULL,
//     date TIMESTAMP NOT NULL,
//     photoUrl text,
//     description TEXT,
//     cost INT ,
//     dateFixed TIMESTAMP,
    
//   );

  writeStream.write(roomRecord);


}
writeStream.end();



