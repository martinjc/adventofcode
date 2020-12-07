const fs = require('fs');

let lights = new Array(1000);
for(let i = 0; i < 1000; i++) {
    lights[i] = new Array(1000);
    for(let j = 0; j < 1000; j++) {
        lights[i][j] = 0;
    }
}

let setValue = function(x1, y1, x2, y2, v) {
    for(let x = x1; x <= x2; x++) {
        for(let y = y1; y <= y2; y++) {
            lights[x][y] = v;
        }
    }
}

let toggle = function(x1, y1, x2, y2) {
    for(let x = x1; x <= x2; x++) {
        for(let y = y1; y <= y2; y++) {
            if(lights[x][y] === 1) {
                lights[x][y] = 0;
            } else if(lights[x][y] === 0) {
                lights[x][y] = 1;
            }
        }
    }
}

let on = function(x1, y1, x2, y2) {
    setValue(x1, y1, x2, y2, 1);
}

let off = function(x1, y1, x2, y2) {
    setValue(x1, y1, x2, y2, 0)
}

let getCoords = function(l, callback) {
    coords = l.split(' through ');
    start_coords = coords[0].split(',');
    end_coords = coords[1].split(',');
    callback(+start_coords[0], +start_coords[1], +end_coords[0], +end_coords[1]);
}

fs.readFile('input', 'utf-8', (err, data) => {
    let lines = data.split(/\r?\n/);
    lines.forEach(l => {
        if(l.startsWith('toggle')) {
            l = l.replace('toggle ', '');
            getCoords(l, toggle);
        } else if(l.startsWith('turn on ')) {
            l = l.replace('turn on ', '');
            getCoords(l, on);
        } else if(l.startsWith('turn off ')) {
            l = l.replace('turn off ', '');
            getCoords(l, off);
        }
    });
    let sum = lights.reduce((acc, a) => {
        return acc + a.reduce((bcc, b) => {
            return bcc + b;
        }, 0);
    }, 0);
    console.log(sum);
});