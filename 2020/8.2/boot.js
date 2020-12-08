const fs = require('fs');




let lines = undefined;

let testBoot = function(callback) {
    let acc = 0;
    let instructions = new Set();
    fs.readFile('input', 'utf-8', (err, data) => {
        lines = data.split(/\r?\n/);
        let i = 0;
        while(i < lines.length) {
            [instruction, value] = lines[i].split(' ');
            if(instructions.has(i)) {
                break;
            } else {
                instructions.add(i);
            }
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
        callback(i, acc);
    });
}

let prime = function() {
    let jmp = [];
    let nop = [];
    let acc = 0;
    let instructions = new Set();
    fs.readFile('input', 'utf-8', (err, data) => {
        lines = data.split(/\r?\n/);

        let i = 0;
        while(i < lines.length) {
            [instruction, value] = lines[i].split(' ');
            if(instructions.has(i)) {
                break;
            } else {
                instructions.add(i);
                if(instruction === 'jmp') {
                    jmp.push(`${i} - ${lines[i]}`);
                } else if (instruction === 'nop') {
                    nop.push(`${i} - ${lines[i]}`);
                }
            }
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
    });
}

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);

    let i = 0;
    while(i < lines.length) {
        [instruction, value] = lines[i].split(' ');
        if(instructions.has(i)) {
            break;
        } else {
            instructions.add(i);
            if(instruction === 'jmp') {
                jmp.push(`${i} - ${lines[i]}`);
            } else if (instruction === 'nop') {
                nop.push(`${i} - ${lines[i]}`);
            }
        }
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
    console.log(`${i}: ${acc}`);
    console.log(instructions.size);
    console.log(jmp);
    console.log(jmp.length);
    console.log(nop);
    console.log(nop.length);
});