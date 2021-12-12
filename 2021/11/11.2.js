const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

let octopi = [];

rows.forEach(r => {
    octopi.push(r.split('').map(n => +n));
});

console.table(octopi);

let flashed = [];
for (let i = 0; i < octopi.length; i++) {
    flashed.push(new Array(octopi[0].length).fill(0));
}

function getNeighbours(x, y) {
    let neighbours = [];
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (!(i === 0 && j === 0)) {
                if (x + i >= 0 && x + i < octopi.length && y + j >= 0 && y + j < octopi[0].length) {
                    neighbours.push({x: x+i, y: y+j});
                }
            }
        }
    }
    return neighbours;
}

function flash(x, y) {
    flashed[x][y] = 1;
    octopi[x][y] = 0;
    let neighbours = getNeighbours(x, y);
    for(n of neighbours) {
        if (flashed[n.x][n.y] === 0) {
            octopi[n.x][n.y]++;
            if (octopi[n.x][n.y] > 9) {
                flash(n.x, n.y);
            }
        }
    }
}

let numFlashed = [];
let allFlashed = false;
let step = 0;

while (!allFlashed) {
    step++
    console.log(`step: ${step}`);
    for (let i = 0; i < octopi.length; i++) {
        for (let j = 0; j < octopi[0].length; j++) {
            flashed[i][j] = 0;
        }
    }

    for (let x = 0; x < octopi.length; x++) {
        for (let y = 0; y < octopi[0].length; y++) {
            if (flashed[x][y] === 0) {
                octopi[x][y]++;
            }
            if (octopi[x][y] > 9) {
                flash(x, y);
            }
        }
    }
    console.table(octopi);
    let numberFlashed = flashed.flat().filter(o => o === 1).length;
    console.log(numberFlashed);
    numFlashed.push(numberFlashed);
    console.table(numFlashed);
    if (numberFlashed === octopi.length * octopi[0].length) {
        console.log(`ALL FLASHED: ${step}`);
        allFlashed = true;
    }
}