const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src/assets/icons/logo.png');

const filePathOfMaternity = path.join(
  __dirname,
  'src/assets/icons/maternity.png',
);

const fileOfcardRoom = path.join(
  __dirname,
  'src/assets/icons/flipCardRoom.png',
);

const maternity = fs.readFileSync(filePathOfMaternity);
const cardRoom = fs.readFileSync(fileOfcardRoom);
const file = fs.readFileSync(filePath);

const base64 = file.toString('base64');
const base64Maternity = maternity.toString('base64');
const base64CardRoom = cardRoom.toString('base64');

console.log(base64);
console.log('materity');

console.log('  ');
console.log('  ');
console.log('  ');
console.log('  ');
console.log('  ');
console.log('  ');
console.log(base64Maternity);
console.log('  ');
console.log('  ');
console.log('  ');
console.log('  ');
console.log(base64CardRoom);
