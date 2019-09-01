/* eslint-disable prefer-destructuring */
const faker = require('faker');
const fs = require('fs');

const writeStream = fs.createWriteStream('issues.csv');

// node --max-old-space-size=8192 issues.js

writeStream.write('id,room_id,category_id,subcategory_id,photoUrl,description,cost,date_issued,contact_id,date_received,date_resolved\n');


for (let i = 1; i <= 200; i += 1) {
  const roomId = faker.random.number({ min: 1, max: 100 });
  const categoryId = faker.random.number({ min: 1, max: 5 });

  let subcategoryId = 0;
  switch (categoryId) {
    default:
      subcategoryId = 0;
      break;
    case 1:
      subcategoryId = faker.random.number({ min: 1, max: 8 });
      break;
    case 2:
      subcategoryId = faker.random.number({ min: 9, max: 13 });
      break;
    case 3:
      subcategoryId = faker.random.number({ min: 14, max: 17 });
      break;
    case 4:
      subcategoryId = faker.random.number({ min: 18, max: 21 });
      break;
    case 5:
      subcategoryId = faker.random.number({ min: 22, max: 23 });
      break;
  }
  const dateIssued = faker.date.between('2019-07-25', '2019-08-21').toLocaleString().split(' ')[0];

  const photoUrl = faker.image.imageUrl(400, 400, 'business');

  const description = faker.lorem.sentence();

  const cost = faker.random.number({ min: 0, max: 1000 });


  const probability = Math.floor(Math.random() * 3);
  let dateReceived = '';
  let contactId = '';

  if (probability >= 1) {
    dateReceived = new Date(dateIssued);
    const receivedDays = Math.floor(Math.random() * 3) + 1;
    dateReceived.setDate(dateReceived.getDate() + receivedDays);
    dateReceived = dateReceived.toLocaleString().split(' ')[0];

    let contacts = [];

    switch (categoryId) {
      case 1:
        contacts = [3, 5, 8];
        contactId = contacts[Math.floor(Math.random() * 3)];
        break;
      case 2:
        contacts = [6, 7];
        contactId = contacts[Math.floor(Math.random() * 2)];
        break;
      case 3:
        contacts = [2, 4];
        contactId = contacts[Math.floor(Math.random() * 2)];
        break;
      case 4:
        contacts = [1, 10];
        contactId = contacts[Math.floor(Math.random() * 2)];
        break;
      case 5:
        contacts = 9;
        contactId = contacts;
        break;
      default:
    }
  }

  const resolve = Math.floor(Math.random() * 10);

  let dateResolved = '';


  if (probability >= 1 && resolve >= 4) {
    dateResolved = new Date(dateReceived);
    const resolvedDays = Math.floor(Math.random() * 14);
    dateResolved.setDate(dateResolved.getDate() + resolvedDays + 1);
    dateResolved = dateResolved.toLocaleString().split(' ')[0];
  }


  const issueRecord = `${i},${roomId},${categoryId},${subcategoryId},${photoUrl},${description},${cost},${dateIssued},${contactId},${dateReceived},${dateResolved}\n`;


  // CREATE TABLE issues (
  //   id serial PRIMARY KEY,
  //   room_id INT NOT NULL,
  //   category_id INT NOT NULL,
  //   subcategory_id INT NOT NULL,
  //   photourl text,
  //   description TEXT,
  //   cost INT ,
  //   date_issued TIMESTAMP NOT NULL,
  //   contact_id INT,
  //   date_received TIMESTAMP,
  //   date_resolved TIMESTAMP
  // );

  writeStream.write(issueRecord);
}
writeStream.end();
