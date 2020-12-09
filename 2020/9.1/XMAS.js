const fs = require('fs');

let testInput = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;


let checkSum = function(total, numbers) {
    return numbers.some(a => {
        return numbers.some(b => {
            return (a !== b && a + b === total);
        })
    });
}

const PREAMBLE = 255;
let numbers = [];

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    for(let i = 0; i < PREAMBLE; i++) {
        numbers.push(+lines[i]);
    }
    for(let i = PREAMBLE; i < lines.length; i++) {
        if(checkSum(+lines[i], numbers)) {
            numbers.shift();
            numbers.push(+lines[i]);
        } else {
            console.log(`${i}: ${lines[i]}`);
            break;
        }
    }
});