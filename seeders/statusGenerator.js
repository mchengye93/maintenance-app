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
  const dateReceived = new Date(dateIssued);
  const receivedDays = Math.floor(Math.random() * 3);
  dateReceived.setDate(dateReceived.getDate() + receivedDays);
  console.log('Date received:', dateReceived);

  const dateResolved = new Date(dateReceived);
  const resolvedDays = Math.floor(Math.random() * 15);
  dateResolved.setDate(dateResolved.getDate() + resolvedDays);
  console.log('Date resolved:', dateResolved);


  console.log(issueId, categoryId, dateIssued);
});
