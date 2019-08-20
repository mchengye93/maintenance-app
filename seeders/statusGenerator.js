const faker = require('faker');
const readline = require('readline');
const fs = require('fs');

const writeStream = fs.createWriteStream('status.csv');

const myInterface = readline.createInterface({
  input: fs.createReadStream('issues.csv'),
});

let lineno = 0;
myInterface.on('line', (line) => {
  lineno += 1;
  console.log(`Line number ${lineno}: ${line}`);
  const lineArr = line.split(',');
  console.log(lineArr);
});
