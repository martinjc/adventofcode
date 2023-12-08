let fs = require('fs')

let input = fs.readFileSync('input', 'utf-8').split('\n');


const instructions = input[0].split('').map(i =>  i === 'R' ? 1 : 0);
input = input.slice(2);

//console.log(instructions);
//console.log(input);

let counter = 0;
let node = input[0].substring(0,3);
let links = input[0].substring(7, 15).split(', ');
let instructionCount = 0;
let instruction = instructions[instructionCount];

let step = 0;

//console.log(node);
//console.log(links);

while(node !== 'ZZZ') {
    step++;
    let next = input.find(i => i.substring(0, 3) === links[instruction]);
    //console.log(next);
    node = next.substring(0,3);
    links = next.substring(7, 15).split(', ');

    if(instructionCount < instructions.length - 1) {
        instructionCount++;
    } else {
        instructionCount = 0;
    }

    instruction = instructions[instructionCount];
}

console.log(step);