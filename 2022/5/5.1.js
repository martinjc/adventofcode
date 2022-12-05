const fs = require('fs');
let input = fs.readFileSync('input', 'utf-8').split('\n');

let stacks = new Array(9);
stacks[0] = ['J', 'H', 'P', 'M', 'S', 'F', 'N', 'V'];
stacks[1] = ['S', 'R', 'L', 'M', 'J', 'D', 'Q'];
stacks[2] = ['N', 'Q', 'D', 'H', 'C', 'S', 'W', 'B'];
stacks[3] = ['R', 'S', 'C', 'L'];
stacks[4] = ['M', 'V', 'T', 'P', 'F', 'B'];
stacks[5] = ['T', 'R', 'Q', 'N', 'C'];
stacks[6] = ['G', 'V', 'R'];
stacks[7] = ['C', 'Z', 'S', 'P', 'D', 'L', 'R'];
stacks[8] = ['D', 'S', 'J', 'V', 'G', 'P', 'B', 'F'];

