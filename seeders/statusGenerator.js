const faker = require('faker');
const readline = require('readline');
const fs = require('fs');

const writeStream = fs.createWriteStream('status.csv');

writeStream.write('id,issue_id,contact_id,date_received,date_resolved');
const myInterface = readline.createInterface({
  input: fs.createReadStream('issues.csv'),
});

let lineno = 0;
myInterface.on('line', (line) => {
  lineno += 1;
  // console.log(`Line number ${lineno}: ${line}`);
  const issue = line.split(',');
  const issueId = issue[0];
  const categoryId = issue[2];
  const dateIssued = issue[4].split(' ')[0];
  // const date_resolved = new Date(dateIssued).addDays(Math.floor(Math.random() * 10));
  // const date_received = faker.date.between(dateIssued, date_resolved).toLocaleString();
  const date_received = new Date(dateIssued);
  date_received.setDate(date_received.getDate() + 1);
  console.log('Date received:', date_received);

  const date_resolved = new Date(date_received);
  const days = Math.floor(Math.random() * 14);
  date_resolved.setDate(date_resolved.getDate() + days);
  console.log(date_resolved);


  console.log(issueId, categoryId, dateIssued);
});
