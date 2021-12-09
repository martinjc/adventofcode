const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

let totalSum = 0;

rows.forEach(r => {

    let mapping = {};
    let io = r.split(' | ');
    let inputs = io[0].trim().split(' ');
    console.log(inputs);

    inputs = inputs.map(i => i.split('').sort());

    mapping[1] = inputs.filter(i => i.length === 2)[0];
    mapping[7] = inputs.filter(i => i.length === 3)[0];
    mapping[4] = inputs.filter(i => i.length === 4)[0];
    mapping[8] = inputs.filter(i => i.length === 7)[0];
    mapping[3] = inputs.filter(i => {
        return i.length === 5 && i.includes(mapping[1][0]) && i.includes(mapping[1][1]);
    })[0];
    mapping[9] = [...new Set([...mapping[3], ...mapping[4]])].sort();
    mapping[5] = inputs.filter(i => {
        return i.length === 5 && i.every(s => mapping[9].includes(s)) && i.sort().toString() !== mapping[3].sort().toString();
    })[0];
    mapping[2] = inputs.filter(i => {
        return i.length === 5 && i.sort().toString() !== mapping[3].sort().toString() && i.sort().toString() !== mapping[5].sort().toString();
    })[0];
    mapping[6] = inputs.filter(i => {
        return i.length === 6 && !mapping[1].every(s => i.includes(s));
    })[0];
    mapping[0] = inputs.filter(i => {
        return i.length === 6 && i.sort().toString() !== mapping[6].sort().toString() && i.sort().toString() !== mapping[9].sort().toString();
    })[0];

    console.log(mapping);

    let lookup = {}
    Object.entries(mapping).forEach((k) => {
        lookup[k[1]] = k[0];
    });
    console.log(lookup);


    let sum = '';

    let outputs = io[1].trim().split(' ');
    outputs = outputs.map(i => i.split('').sort());
    console.log(outputs);
    outputs.forEach(o => {
        sum += lookup[o];
    });
    console.log(sum);
    totalSum += +sum;

});

console.log(totalSum);