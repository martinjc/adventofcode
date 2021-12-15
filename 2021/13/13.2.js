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

instructions.forEach(i => {
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
});
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

let page = [];
for (let i = 0; i <= maxY; i++) {
    page.push(new Array(maxX).fill(0));
}
console.table(page);

filteredCoords.forEach(f => {
    console.log(f);
    fC = f.split(',').map(n => +n);
    page[fC[1]][fC[0]] = '##';
});

console.table(page);
