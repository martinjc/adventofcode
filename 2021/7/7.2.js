const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let crabInput = data.split(',').map(n => +n);

console.log(crabInput);

let max = Math.max(...crabInput);
console.log(max);

let diffs = new Array(max).fill(0);

for (let i = 0; i < max; i++) {
    let sum = 0;
    for (c of crabInput) {
        if (c !== i) {
            let diff = Math.abs(i - c);
            sum += Math.floor((diff * (diff + 1)) / 2);
        }
    }
    diffs[i] = sum;
}


console.log(diffs);

let min = Math.min(... diffs);

console.log(min);