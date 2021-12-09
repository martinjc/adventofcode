const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

heights = [];
rows.forEach(r => heights.push(r.split('').map(n => +n)));


function getNeighbourCoords(heights, i, j) {
    neighbours = [];
    if (i >= 1) {
        neighbours.push({ i: i - 1, j: j });
    }
    if (i < heights.length-1) {
        neighbours.push({ i: i + 1, j: j });
    }
    if (j >= 1) {
        neighbours.push({ i: i, j: j - 1 });
    }
    if (j < heights[0].length - 1) {
        neighbours.push({ i: i, j: j + 1});
    }
    return neighbours;
}

function getNeighbours(heights, i, j) {
    let neighbourCoords = getNeighbourCoords(heights, i, j)
    return neighbourCoords.map(n => heights[n.i][n.j]);
}

function neighbourInNeighbourhood(neighbourhood, i, j) {
    if (neighbourhood.length === 0) {
        return false;
    } else {
        return neighbourhood.find(n => (n.i === i && n.j === j));
    }
}

function getNon9NeighbourhoodNeighbours(heights, neighbourhood, i, j) {
    if (heights[i][j] === 9) {
        return neighbourhood;
    }
    let neighbourCoords = getNeighbourCoords(heights, i, j);
    let non9NeighbourCoords = neighbourCoords.filter(n => heights[n.i][n.j] !== 9);
    if (non9NeighbourCoords.length === 0) {
        return neighbourhood;
    } else {
        non9NeighbourCoords.forEach(n => {
            if (!neighbourInNeighbourhood(neighbourhood, n.i, n.j)) {
                neighbourhood.push(n);
                getNon9NeighbourhoodNeighbours(heights, neighbourhood, n.i, n.j);
            }
        });
        return neighbourhood;
    }
}

let minima = [];

for (let i = 0; i < heights.length; i++) {
    for (let j = 0; j < heights[0].length; j++) {
        let val = heights[i][j];
        let neighbours = getNeighbours(heights, i, j);
        let lowest = neighbours.every(n => n > val);
        if (lowest) {
            minima.push({ i: i, j: j, val: val });
        }
    }
}

console.log(minima);


let sizes = [];

minima.forEach(m => {
    let cavern = getNon9NeighbourhoodNeighbours(heights, [], m.i, m.j);
    sizes.push(cavern.length);
});

sizes = sizes.sort((a, b) => b - a)
console.log(sizes);
console.log(sizes[0] * sizes[1] * sizes[2]);