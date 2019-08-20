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
  console.log(`Line number ${lineno}: ${line}`);
  const issue = line.split(',');
  const issueId = issue[0];
  const categoryId = issue[2];
  const dateIssued = issue[4];

  console.log(issueId, categoryId, dateIssued);
});
