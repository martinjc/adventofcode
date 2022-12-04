const fs = require('fs');

let input = fs.readFileSync('input', 'utf8').split('\n');
console.log(input);

let seating = [];

function extractNames(input) {
    let names = [];
    for (line of input) {
        if (!names.includes(line.split(' ')[0])) {
            names.push(line.split(' ')[0]);
        }
    }
    return names;
}
let names = extractNames(input);
for (n of names) {
    seating.push(new Array(names.length).fill(0));
}

console.log(seating);

function extractWeights(input) {
    for (line of input) {
        let value = line.split(' ')[3];
        let magnitude = line.split(' ')[2];
        let weight = magnitude === 'gain' ? +value : +value * -1;
        let name1 = line.split(' ')[0];
        let name2 = line.split(' ')[10].slice(0, -1);
        seating[names.indexOf(name1)][names.indexOf(name2)] = weight;
    }
}
extractWeights(input);
console.log(seating);

let happinessMatrix = [];
for (n of names) {
    happinessMatrix.push(new Array(names.length).fill(0));
}

for (let i = 0; i < names.length; i++) {
    for (let j = 0; j < names.length; j++) {
        if (i === j) {
            happinessMatrix[i][j] = 0;
        } else {
            happinessMatrix[i][j] = seating[i][j] + seating[j][i];
        }
    }
}

console.log(happinessMatrix);



