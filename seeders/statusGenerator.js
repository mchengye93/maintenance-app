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
  console.log('Issued date: ', dateIssued);

  const probability = Math.floor(Math.random() * 2);
  let dateReceived = '';

  if (probability === 1) {
    dateReceived = new Date(dateIssued);
    const receivedDays = Math.floor(Math.random() * 3) + 1;
    dateReceived.setDate(dateReceived.getDate() + receivedDays);
  }

  const resolve = Math.floor(Math.random() * 10);
  let dateResolved = '';
  if (probability === 1 && resolve > 5) {
    dateResolved = new Date(dateReceived);
    const resolvedDays = Math.floor(Math.random() * 14);
    dateResolved.setDate(dateResolved.getDate() + resolvedDays + 1);
  }
  console.log('Date received:', dateReceived.toLocaleString().split(' ')[0]);
  console.log('Date resolved:', dateResolved.toLocaleString().split(' ')[0]);
  console.log(issueId, categoryId, dateIssued);
});
