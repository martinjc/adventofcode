let fs = require('fs')

let input = fs.readFileSync('input', 'utf-8').split('\n');


const instructions = input[0].split('').map(i =>  i === 'L' ? 1 : 2);
input = input.slice(2);
console.log(instructions);

let startingNodes = input.filter(i => i[2] === 'A').map(n => n.match(/[0-9A-Z]{3}/g));
console.log(startingNodes);

let steps = [];

for(currentNode of startingNodes) {
    console.log(currentNode);
    let instructionNumber = 0;
    let instruction = instructions[instructionNumber];
    let step = 0;

    while(currentNode[0][2] !== 'Z') {
        //console.log(currentNode, instruction);
        step++;
        currentNode = input.find(i => i.substring(0, 3) === currentNode[instruction]).match(/[0-9A-Z]{3}/g);

        if(instructionNumber < instructions.length-1) {
            instructionNumber++;
        } else {
            instructionNumber = 0;
        }
        //console.log(instructionNumber);
        instruction = instructions[instructionNumber];
    }
    steps.push(step);
}

function gcd(a, b) {
    return !b ? a : gcd(b, a % b);
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);   
}

console.log(steps);

let multiple = steps[0];
steps.forEach(function(n) {
    multiple = lcm(multiple, n);
});

console.log(multiple);