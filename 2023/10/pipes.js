let fs = require('fs')

let input = fs.readFileSync('input', 'utf-8').split('\n').map(i => i.split(''));
for(line of input) {
    line.unshift('.');
    line.push('.');    
}
input.unshift(Array(input[0].length).fill('.'));
input.push(Array(input[0].length).fill('.'));
console.log(input);

let pipes = [];