const fs = require('fs');

let instructions = new Set();
let acc = 0;

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);

    let i = 0;
    while(i < lines.length) {
        if(instructions.has(i)) {
            break;
        } else {
            instructions.add(i);
        }
        [instruction, value] = lines[i].split(' ');
        console.log(`${i}: ${instruction} ${+value} acc:${acc}`);
        if(instruction === 'acc') {
            acc += +value;
            console.log(`acc ${value}: ${acc}`);
            i++;
        } else if (instruction === 'jmp') {
            i = i + +value;
            console.log(`jmp ${+value}: ${i}`);
        } else if (instruction === 'nop') {
            console.log(`nop`);
            i++;
        }
    }
    console.log(acc);
});