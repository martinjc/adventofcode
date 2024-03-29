const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

let chitons = [];
let visited = [];
let distances = [];

rows.forEach(r => {
    chitons.push(r.split('').map(n => +n));
    visited.push(new Array(r.split('').length).fill(0));
    distances.push(new Array(r.split('').length).fill(Number.MAX_SAFE_INTEGER));
});

// console.table(chitons);
// console.table(visited);

let startX = 0;
let startY = 0;

let destX = chitons[0].length-1;
let destY = chitons.length-1;

distances[startY][startX] = 0;

function getNeighbourCoords(chitons, x, y, visited) {
    neighbours = [];
    if (x >= 1 && visited[y][x-1] === 0) {
        neighbours.push({ x: x - 1, y: y });
    }
    if (x < chitons[0].length-1 && visited[y][x+1] === 0) {
        neighbours.push({ x: x + 1, y: y });
    }
    if (y >= 1 && visited[y-1][x] === 0) {
        neighbours.push({ x: x, y: y - 1 });
    }
    if (y < chitons.length - 1 && visited[y+1][x] === 0) {
        neighbours.push({ x: x, y: y + 1});
    }
    return neighbours;
}

function lowestUnvisited(visited, distances) {
    let minX = visited[0].length;
    let minY = visited.length;
    let minDistance = Number.MAX_SAFE_INTEGER;
    for (let x = 0; x < visited[0].length; x++) {
        for (let y = 0; y < visited.length; y++) {
            if (distances[y][x] < minDistance && visited[y][x] === 0) {
                minX = x;
                minY = y;
                minDistance = distances[y][x];
            }
        }
    }
    return [minX, minY];
}

let c = [0, 0];
let step = 0;
while (visited[destY][destX] === 0) {
    neighbours = getNeighbourCoords(chitons, c[0], c[1], visited);
    neighbours.forEach(n => {
        let candidate = distances[c[1]][c[0]] + chitons[n.y][n.x];
        if (candidate < distances[n.y][n.x]) {
            distances[n.y][n.x] = candidate;
        }
    });

    newCoords = [];

    visited[c[1]][c[0]] = 1;
    //console.table(distances);
    //console.table(visited);

    c = lowestUnvisited(visited, distances);
    step++;
}

console.table(visited);
console.table(distances);

console.log(distances[destY][destX]);