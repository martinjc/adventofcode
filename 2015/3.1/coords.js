const fs = require('fs');

let coords = new Set();

let currentCoords = [0, 0];

fs.readFile('input', 'utf-8', (err, data) => {
    for(let i = 0; i < data.length; i++) {
        let instruction = data[i];
        if(instruction === '^') {
            currentCoords[1]++;
        } else if(instruction === 'v') {
            currentCoords[1]--;
        } else if(instruction === '>') {
            currentCoords[0]++;
        } else if(instruction === '<') {
            currentCoords[0]--;
        }
        coords.add(JSON.stringify(currentCoords));
    }
    console.log(coords.size + 1);
})