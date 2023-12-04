let fs = require('fs')

const numbers = /\d+/g;
const symbols = /[^\d.]/g;

let input = fs.readFileSync('input', 'utf-8').split('\n').map(line => `.${line}.`);
const lineLength = input[0].length;
input.splice(0, 0, '.'.repeat(lineLength));
input.push('.'.repeat(lineLength));

let data = [];

class Symbol {
    constructor(symbol, x, y) {
        this.symbol = symbol;
        this.x = x;
        this.y = y;
        this.neighbours = [];
    }
}

input.forEach((line, r) => {
    let matches = line.matchAll(symbols);
    console.log(matches);
    for(m of matches) {
        data.push(new Symbol(m[0], m.index, r));
    }
});

console.log(data);

for(s of data) {
    for(let i = s.y - 1; i <= s.y + 1; i++) {
        let neighbourMatches = input[i].matchAll(numbers);
        for(m of neighbourMatches) {
            if(s.x >= m.index-1 && s.x <= m.index + m[0].length) {
                s.neighbours.push(+m[0]);
            }
        }
    }
}

console.log(data);

let sum = data.reduce((acc, s) => {
    return acc += s.neighbours.reduce((a, b) => a + +b, 0);
}, 0);

console.log(sum);

let gearratio = data.reduce((acc, s) => {
    if(s.symbol === '*' && s.neighbours.length === 2) {
        return acc += (s.neighbours[0] * s.neighbours[1]);
    }
    return acc;
}, 0);

console.log(gearratio);