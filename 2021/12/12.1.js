const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

inputs = new Set();
rows.forEach(r => {
    let caves = r.split('-');
    caves.forEach(c => inputs.add(c));
});
console.log(inputs);
inputs = Array.from(inputs);

let matrix = [];
for (let i = 0; i < inputs.length; i++) {
    matrix.push(new Array(inputs.length).fill(0));
}

rows.forEach(r => {
    let caves = r.split('-');
    sIx = inputs.indexOf(caves[0]);
    eIx = inputs.indexOf(caves[1]);
    matrix[sIx][eIx] = 1;
    matrix[eIx][sIx] = 1;
});

// lets remove small caves that are dead ends
lowerCaseInputs = inputs.filter(i => i !== 'start' && i !== 'end' && !(i === i.toUpperCase()));

console.log(lowerCaseInputs);
console.table(matrix);

// remove rows that only have one link (the reduce) and that also are only linked to a lowercase cave
deadends = lowerCaseInputs.filter(lci => matrix[inputs.indexOf(lci)].reduce((a, i) => a + i) === 1 && inputs[matrix[inputs.indexOf(lci)].indexOf(1)] === inputs[matrix[inputs.indexOf(lci)].indexOf(1)].toLowerCase());

console.log(deadends);

let deadIxs = deadends.map(d => inputs.indexOf(d));
console.log(deadIxs);

for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
        if (deadIxs.includes(i) || deadIxs.includes(j)) {
            matrix[i][j] = 0;
        }
    }
}

// only valid paths remain, now lets find them
console.table(matrix);

let paths = [];



paths = bfs(matrix, paths, 0);
console.log(paths);