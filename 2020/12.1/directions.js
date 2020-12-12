const fs = require('fs');

let input = `F10
N3
F7
R90
F11`;

let directions = {
    90: 'E',
    180: 'S',
    270: 'W',
    0 : 'N',
    360: 'N'
};

let direction = 90;
let x = 0;
let y = 0;

let clampDirection = function() {
    while(direction < 0) {
        direction += 360;
    }
    while(direction > 360) {
        direction -= 360;
    }
}

let move = function(d, a) {
    if(d === 'N') {
        x += a;
    } else if(d === 'S') {
        x -= a;
    } else if(d === 'E') {
        y += a;
    } else if(d === 'W') {
        y -= a;
    } else if(d === 'L') {
        direction -= a;
        clampDirection();
    } else if (d === 'R') {
        direction += a;
        clampDirection();
    } else if (d === 'F') {
        move(directions[direction], a);
    } else if (d === 'R') {
        let tempDirection = direction - 180;
        move(directions[tempDirection], a);
    }
    
}

fs.readFile('input', 'utf-8', (err, data) => {

    let lines = data.split(/\r?\n/);
    //lines = input.split(/\r?\n/);

    lines.forEach(l => {
        let command = l[0];
        let amount = +l.slice(1);
        move(command, amount);

    });
    console.log(Math.abs(x) + Math.abs(y));
});
