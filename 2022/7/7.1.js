const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');

let structure = {'/': {}};
let currentDir = structure;

for(let line of input) {
    let tokens = line.split(' ');
    let command, argument
    if(tokens[0] === '$') {
        command = tokens[1];
        argument = tokens [2];
    } else {
        command = tokens[0];
        argument = tokens[1];
    }
    if(command === 'ls') {
        // don't care
    } else if(command === 'dir') {
        if(!currentDir.hasOwnProperty(argument)) {
            currentDir[argument] = {'..': currentDir};
        }
    } else if(command === 'cd') {
        if(argument == '..') {
            currentDir = currentDir['..'];
        } else {
            currentDir = currentDir[argument]
        }
    } else {
        currentDir[argument] = +command;
    }
}

console.log(structure);
let sizes = {}

function findSize(directory, sizes) {
    if(typeof(directory) === 'number') {
        return directory;
    } else {
        let sum = 0;
        for(let [key, value] of Object.entries(directory)) {
            if(key !== '..') {
                if(typeof(value) === 'object') {
                    sizes[key] = findSize(value, sizes);
                    sum += sizes[key];
                } else {
                    sum += +value;
                }
            }
        }
        return sum;
    }
}



for([key, value] of Object.entries(structure['/'])) {
    if(key !== '..') {
        sizes[key] = findSize(value, sizes);
    }
}

console.log(sizes);

let count = 0;
for(let [key, value] of Object.entries(sizes)) {
    if(value <= 100000) {
        count += value;
    }
}
console.log(count);