const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

let points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
};

let total = 0;

rows.forEach(r => {
    let stack = [];
    let c = '';
    for (let i = 0; i < r.length; i++) {
        c = r[i];
        if (c === '(' || c === '[' || c === '{' || c === '<') {
            stack.push(c);
            continue;
        }
        if (c === ')' || c === ']' || c === '}' || c === '>') {
            // closing bracket and stack empty
            if (stack.length === 0) {
                total += points[c];
                break;
            }
            // closing bracket and not matching opening on stack
            let last = stack[stack.length - 1];
            if ((c === ')' && last !== '(') || (c === '}' && last !== '{') || (c === ']' && last !== '[') || (c === '>' && last !== '<')) {
                total += points[c];
                break;
            }
            stack.pop();
        }
    }
});
console.log(total);