const fs = require('fs');
const { setFlagsFromString } = require('v8');

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

function findSize(path, directory, sizes) {
    if(typeof(directory) === 'number') {
        return directory;
    } else {
        let sum = 0;
        for(let [key, value] of Object.entries(directory)) {
            if(key !== '..') {
                if (typeof (value) === 'object') {
                    path = `${path}-${key}`
                    sizes[path] = findSize(path, value, sizes);
                    sum += sizes[path];
                } else {
                    sum += +value;
                }
            }
        }
        return sum;
    }
}



for ([key, value] of Object.entries(structure)) {
    let path = '';
    if (key !== '..') {
        path = `${key}`
        sizes[key] = findSize(path, value, sizes);
    }
}

console.log(sizes);

let freespace = 70000000 - sizes['/'];
console.log(freespace);
let needed = 30000000 - freespace;
console.log(needed);

let smallest_size = sizes['/'];
for (let [key, value] of Object.entries(sizes)) {
    if ((value >= needed) && (value < smallest_size)) {
        smallest_size = value;
    }
}
console.log(smallest_size);