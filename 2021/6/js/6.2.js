const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

let fishInput = rows[0].split(',').map(n => +n);
console.log(fishInput);

let fishCount = new Array(9).fill(0);

fishInput.forEach(f => fishCount[f]++);

console.log(fishCount);

for (let day = 0; day < 256; day++) {
    let numZero = fishCount[0];
    for (let i = 1; i < fishCount.length; i++) {
        fishCount[i - 1] = fishCount[i];
    }
    fishCount[8] = numZero;
    fishCount[6] += numZero;
}

console.log(fishCount);

let total = fishCount.reduce((f, i) => f + i);
console.log(total);