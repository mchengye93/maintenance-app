const faker = require('faker');
const fs = require('fs');

const writeStream = fs.createWriteStream('issues.csv');

// node --max-old-space-size=8192 issues.js

writeStream.write('id,room_id,category_id,subcategory_id,date,photoUrl,description,cost,dateFixed\n');


for (let i = 1; i <= 500; i += 1) {
  const roomId = faker.random.number({ min: 1, max: 100 });
  const category = faker.random.number({ min: 1, max: 5 });

  let subcategory = 0;
  switch (category) {
    default:
      subcategory = 0;
      break;
    case 1:
      subcategory = faker.random.number({ min: 1, max: 8 });
      break;
    case 2:
      subcategory = faker.random.number({ min: 9, max: 13 });
      break;
    case 3:
      subcategory = faker.random.number({ min: 14, max: 17 });
      break;
    case 4:
      subcategory = faker.random.number({ min: 18, max: 21 });
      break;
    case 5:
      subcategory = faker.random.number({ min: 22, max: 23 });
      break;
  }
  const date = faker.date.between('2019-07-25', '2019-08-15').toLocaleString();

  const photoUrl = faker.image.imageUrl(400, 400, 'business');

  const description = faker.lorem.sentence();

  const cost = faker.random.number({ min: 0, max: 1000 });


  let dateFixed = '';

  const random = Math.floor(Math.random() * 10);
  if (random > 5) {
    dateFixed = faker.date.between(date, '2019-10-01').toLocaleString();
  }


  const issueRecord = `${i},${roomId},${category},${subcategory},${date},${photoUrl},${description},${cost},${dateFixed}\n`;
  // write some data with a base64 encoding
  //   var stockRecord = {
  //     id: i,
  //     roomId: roomId,
  //     parking: parking,
  //   };

  //   CREATE TABLE issues (
  //     id serial PRIMARY KEY,
  //     room_id INT NOT NULL,
  //     category INT NOT NULL,
  //     subcategory INT NOT NULL,
  //     date TIMESTAMP NOT NULL,
  //     photoUrl text,
  //     description TEXT,
  //     cost INT ,
  //     dateFixed TIMESTAMP,
  //   );

  writeStream.write(issueRecord);
}
writeStream.end();