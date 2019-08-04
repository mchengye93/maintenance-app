const faker = require('faker');
const fs = require('fs');

const writeStream = fs.createWriteStream('contacts.csv');

writeStream.write('id,roomId,category,subcategory,date,photoUrl,description,cost,dateFixed\n');

for (let i = 1; i <= 10; i += 1) {
  const categoryId = faker.random.number({ min: 1, max: 5 });

  const name = faker.name.findName();

  const phone = faker.phone.phoneNumberFormat(1);

  const email = faker.internet.email();


  const contactRecord = `${i},${categoryId},${name},${phone},${email}\n`;
  // CREATE TABLE contact (
  //     id serial PRIMARY KEY,
  //     categoryId INT NOT NULL,
  //     name varchar(30) NOT NULL,
  //     phone varchar(30) NOT NULL,
  //     email varchar(30) NOT NULL,
  // )

  writeStream.write(contactRecord);
}
writeStream.end();
