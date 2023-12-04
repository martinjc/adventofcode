let fs = require('fs')

const re = /\d+/g;
const symbols = /[^\d.]/;

let input = fs.readFileSync('input', 'utf-8').split('\n');
input = input.map(line => `.${line}.`);

let parts = [];
let missing = [];
let lineCounter = 0;
let sum = 0;

function checkNeighboursForSymbol(startX, endX, y) {
    if(y > 0) {
        let rowAbove = input[y - 1].substring(Math.max(startX-1,0), Math.min(endX+1, input[y - 1].length));
        if(symbols.test(rowAbove)) {
            console.log('above', rowAbove, symbols.test(rowAbove));
            return true;
        }
    }
    if(startX > 0) {
        let left = input[y].substring(startX - 1, startX);
        if(symbols.test(left)) {
            console.log('left', left, symbols.test(left))
            return true;
        }
    }
    if(endX < input[y].length) {
        let right = input[y].substring(endX, endX + 1);
        if(symbols.test(right)) {
            console.log('right', right, symbols.test(right))
            return true;
        }
    }
    if(y < input.length-1) {
        let rowBelow = input[y + 1].substring(Math.max(startX-1,0), Math.min(endX+1, input[y + 1].length));
        if(symbols.test(rowBelow)) {
            console.log('below', rowBelow, symbols.test(rowBelow));
            return true;
        }
    }
    return false;
}

for(line of input) {
    console.log(line);
    let matches = line.match(re);
    console.log(matches);
    if(matches !== null) {
        for(match of matches) {
            let start = line.indexOf(match);
            let end = start + match.length;
            console.log(match, start, end);
            if(checkNeighboursForSymbol(start, end, lineCounter)) {
                sum += +match;
                parts.push(match);        
            } else {
                missing.push(match);
            }
        }
    }
    lineCounter++;
    console.log(lineCounter, sum);
}
console.log(sum);
//console.log(parts)
console.log(missing);