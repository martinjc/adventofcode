const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

let sum = 0

rows.forEach(r => {
    let io = r.split(' | ');
    let outputs = io[1].trim().split(' ');
    console.log(outputs);
    outputs = outputs.filter(o => {
        return o.length === 2 || o.length === 3 || o.length === 4 || o.length === 7;
    });
    console.log(outputs);
    sum += outputs.length;
});

console.log(sum);