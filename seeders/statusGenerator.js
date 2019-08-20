const faker = require('faker');
const fs = require('fs');

const writeStream = fs.createWriteStream('status.csv');

const myInterface = readline.createInterface({
  input: fs.createReadStream('demofile1.html'),
});

let lineno = 0;
myInterface.on('line', (line) => {
  lineno++;
  console.log(`Line number ${lineno}: ${line}`);
});
