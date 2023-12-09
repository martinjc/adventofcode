let fs = require('fs')

let input = fs.readFileSync('input', 'utf-8').split('\n');


const instructions = input[0].split('').map(i =>  i === 'L' ? 1 : 2);
input = input.slice(2);
console.log(instructions);

let currentNode = input.find(i => i.substring(0, 3) === 'AAA').match(/[A-Z]{3}/g);
let instructionNumber = 0;
let instruction = instructions[instructionNumber];
let step = 0;

while(currentNode[0] !== 'ZZZ') {
    console.log(currentNode, instruction);
    step++;
    currentNode = input.find(i => i.substring(0, 3) === currentNode[instruction]).match(/[A-Z]{3}/g);

    if(instructionNumber < instructions.length-1) {
        instructionNumber++;
    } else {
        instructionNumber = 0;
    }
    console.log(instructionNumber);
    instruction = instructions[instructionNumber];
}

console.log(step);