const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

let input = rows[0];

let letters = new Set();

let pairs = {};
rows.slice(2).forEach(r => {
    let instruction = r.split(' -> ');
    let pair = instruction[0];
    let add = instruction[1];
    letters.add(add);
    pairs[pair] = [];
    pairs[pair].push(pair[0] + add);
    pairs[pair].push(add + pair[1]);
});

console.log(pairs);
console.log(letters);

// counter for pairs
let pairsCount = {};
Object.keys(pairs).forEach(p => pairsCount[p] = 0);


let inputPairs = [];
for (let i = 0; i < input.length-1; i++) {
    inputPairs.push(input[i] + input[i + 1]);
}
console.log(inputPairs);

inputPairs.forEach(iP => pairsCount[iP]++);
console.log(pairsCount);

for (let step = 0; step < 10; step++) {
    let newCounts = {}
    for (p in pairsCount) {
        newCounts[p] = 0;
    }
    for (p in pairsCount) {
        let count = pairsCount[p];
        let newPairs = pairs[p];
        pairsCount[p] = 0;
        newPairs.forEach(nP => newCounts[nP] += count);
    }
    pairsCount = newCounts;
}
console.table(pairsCount);
console.log(Object.values(pairsCount).reduce((a, i) => a + i, 1));

let letterCounts = {}

letters.forEach(l => {
    letterCounts[l] = 0;
})

for (p in pairsCount) {
    let count = pairsCount[p];
    letterCounts[p[0]] += count;
    letterCounts[p[1]] += count;
}

for (l in letterCounts) {
    letterCounts[l] = Math.ceil(letterCounts[l] / 2);
}

console.table(letterCounts);

let max = Math.max(...Object.values(letterCounts));
let min = Math.min(...Object.values(letterCounts));

console.log(max - min);