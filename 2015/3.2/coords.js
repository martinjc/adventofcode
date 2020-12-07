const fs = require('fs');

let coords = new Set();

let santaCoords = [0, 0];
let robotCoords = [0, 0];

coords.add(JSON.stringify(santaCoords));
coords.add(JSON.stringify(robotCoords));

let move = function(instruction, currentCoords) {
    if(instruction === '^') {
        currentCoords[1]++;
    } else if(instruction === 'v') {
        currentCoords[1]--;
    } else if(instruction === '>') {
        currentCoords[0]++;
    } else if(instruction === '<') {
        currentCoords[0]--;
    }
    return currentCoords;
}

fs.readFile('input', 'utf-8', (err, data) => {

    for(let i = 0; i < data.length-1; i += 2) {
        let santaI = data[i];
        let robotI = data[i+1];
        santaCoords = move(santaI, santaCoords);
        robotCoords = move(robotI, robotCoords);
        coords.add(JSON.stringify(santaCoords));
        coords.add(JSON.stringify(robotCoords));
    }
    console.log(coords.size);
})