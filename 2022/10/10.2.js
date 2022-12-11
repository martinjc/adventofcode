const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');

let X = 1;
let count = 1;
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

console.log(values.length);
let output = '';
let rows = [];
let row = 0;
for(let i = 0; i < values.length; i++) {
    let pixel = i - (40*row);
    if(pixel === values[i] || pixel === values[i]-1 || pixel === values[i] + 1) {
        output += '#';
    } else {
        output += '.';
    }
    if(pixel === 39) {
        rows.push(output);
        row += 1;
        output = '';
    }
}

console.log(rows.length);
console.log(rows);