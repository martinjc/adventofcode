const { match } = require('assert');
const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

console.log(rows.length);
rows = rows.filter(r => !matchBrackets(r)[0]);
console.log(rows.length);

let inverse = {
    '{': '}',
    '[': ']',
    '<': '>',
    '(': ')'
}

let points = {
    ')': 1,
    ']': 2,
    '}': 3,
    '>': 4
}

let scores = [];

rows.forEach(r => {
    sc = matchBrackets(r);
    let stack = sc[1];
    stack = stack.reverse();
    stack = stack.map(s => inverse[s]);
    let score = 0;
    stack.forEach(s => {
        score = (score * 5) + points[s];
    });
    scores.push(score);
});

console.log(scores);
scores = scores.sort((a, b) => b - a);
console.log(scores);
console.log(scores[Math.floor(scores.length / 2)]);



function matchBrackets(line) {
    let stack = [];
    let c = '';
    for (let i = 0; i < line.length; i++) {
        c = line[i];
        if (c === '(' || c === '[' || c === '{' || c === '<') {
            stack.push(c);
            continue;
        }
        if (c === ')' || c === ']' || c === '}' || c === '>') {
            // closing bracket and stack empty
            if (stack.length === 0) {
                return [true, stack];
            }
            // closing bracket and not matching opening on stack
            let last = stack[stack.length - 1];
            if ((c === ')' && last !== '(') || (c === '}' && last !== '{') || (c === ']' && last !== '[') || (c === '>' && last !== '<')) {
                return [true, stack];
            }
            stack.pop();
        }
    }
    return [false, stack];
}
