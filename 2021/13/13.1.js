const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

let coords = [];
let instructions = [];

rows.forEach(r => {
    if (r !== '') {
        if (!r.startsWith('f')) {
            coords.push(r.split(',').map(n => +n));
        } else {
            instructions.push(r.replace('fold along ', ''));
        }
    }
});

console.log(coords);
console.log(instructions);

//instructions.forEach(i => {
let i = instructions[0];
    i = i.split('=');
    let direction = i[0];
    let position = +i[1];

    for (c of coords) {
        if (direction === 'x') {
            if (c[0] > position) {
                c[0] = position - (c[0] - position);
            }
        } else if (direction === 'y') {
            if (c[1] > position) {
                c[1] = position - (c[1] - position);
            }
        }
    }
//});
console.log(coords);

let filteredCoords = [];

coords.forEach(c => {
    if (!filteredCoords.includes(c.join(','))) {
        filteredCoords.push(c.join(','));
    }
});

console.log(filteredCoords.sort());
console.log(filteredCoords.length);

maxX = coords.reduce((m, c) => c[0] > m ? c[0] : m, coords[0][0]);
maxY = coords.reduce((m, c) => c[1] > m ? c[1] : m, coords[0][1]);
