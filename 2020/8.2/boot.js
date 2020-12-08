const fs = require('fs');


let runBoot = function(lines, callback) {
    let acc = 0;
    let instructions = new Set();
    let i = 0;
    while(i < lines.length) {
        [instruction, value] = lines[i].split(' ');
        if(instructions.has(i)) {
            break;
        } else {
            instructions.add(i);
        }
        //console.log(`${i}: ${instruction} ${+value} acc:${acc}`);
        if(instruction === 'acc') {
            acc += +value;
            //console.log(`acc ${value}: ${acc}`);
            i++;
        } else if (instruction === 'jmp') {
            i = i + +value;
            //console.log(`jmp ${+value}: ${i}`);
        } else if (instruction === 'nop') {
            //console.log(`nop`);
            i++;
        }
    }
    callback(i, acc);
}

let testBoot = function(lines) {
    runBoot(lines, (i, acc) => {
        console.log(`${i}: ${acc}`);
    });
}

let findNextToChange = function(lines, lastChanged) {
    let i = lastChanged + 1;
    while(i < lines.length) {
        [instruction, value] = lines[i].split(' ');
        if(instruction === 'acc') {
            i++;
        } else if (instruction === 'jmp' || instruction === 'nop') {
            return i;
        }
    }
}

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    let changed = 0;
    let original_instruction = '';
    let count = 0;
    while(!testBoot(lines)) {
        if(original_instruction !== '') {
            lines[changed] = original_instruction;
        }
        console.log(`iteration: ${count}, changed-back: ${changed} - ${lines[changed]}`);
        let i = findNextToChange(lines, changed);
        [instruction, value] = lines[i].split(' ');

        if(instruction === 'jmp') {
            changed = i;
            original_instruction = lines[i];
            lines[i] = `nop ${value}`;
        } else if(instruction === 'nop') {
            changed = i;
            original_instruction = lines[i];
            lines[i] = `jmp ${value}`;
        }
        console.log(`iteration: ${count}, changed: ${changed} - ${original_instruction}`);
        console.log(`changed to: ${lines[i]}`);

        count++;
    };
});