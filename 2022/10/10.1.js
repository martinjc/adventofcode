const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');

let X = 1;
let values = [];
for(line of input) {
    let tokens = line.split(' ');
    if(tokens[0] === 'noop') {
        values.push(X);
    } else {
        values.push(X);
        values.push(X);
        X += +tokens[1];
    }
}

let sum = 0;

for(cycle of [20,60,100,140,180,220]) {
    console.log(values[cycle-1]);
    console.log(values[cycle-1] * cycle);
    sum += (values[cycle-1] * cycle);
}

console.log(sum)