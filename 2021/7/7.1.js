const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let crabInput = data.split(',').map(n => +n);

console.log(crabInput);

let diffs = crabInput.map(c1 => {
    let sum = 0;
    for (c of crabInput) {
        if (c !== c1) {
            sum += Math.abs(c1 - c);
        }
    }
    return sum;
});

console.log(diffs);

let min = diffs[0];
for (d of diffs) {
    if (d < min) {
        min = d;
    }
}

console.log(min);