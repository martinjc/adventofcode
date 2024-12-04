let fs = require('fs');

let input = fs.readFileSync('input', 'utf8').split('\n');

const mulre = /mul\((\d+),(\d+)\)+/g;

let sum = 0;
for(line of input) {
    matches = line.matchAll(mulre);
    for(m of matches) {
        sum += (+m[1] * +m[2]);
    }
}

console.log(sum);
