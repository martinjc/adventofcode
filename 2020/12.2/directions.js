const fs = require('fs');

let input = `F10
N3
F7
R90
F11`;


waypoint_x = 10;
waypoint_y = 1;

let x = 0;
let y = 0;

let rotate = function(d, num) {
    if(d === 'L') {
        while(num > 0){
            let temp_x = waypoint_x;
            let temp_y = waypoint_y;
            waypoint_x = -temp_y;
            waypoint_y = temp_x;
            num--;
        }
    } else if(d === 'R') {
        while(num > 0) {
            let temp_x = waypoint_x;
            let temp_y = waypoint_y;
            waypoint_x = temp_y;
            waypoint_y = -temp_x;
            num--;
        }

    }
}

let forward = function(a) {
    while(a > 0) {
        x += waypoint_x;
        y += waypoint_y;
        a--;
    }
}

let moveWaypoint = function(d, a) {
    if(d === 'N') {
        waypoint_y += a;
    } else if(d === 'S') {
        waypoint_y -= a;
    } else if(d === 'E') {
        waypoint_x += a;
    } else if(d === 'W') {
        waypoint_x -= a;
    } else if(d === 'L' || d === 'R') {
        let rotations = a / 90;
        rotate(d, rotations);
    } else if (d === 'F') {
        forward(a);
    } 
    
}

fs.readFile('input', 'utf-8', (err, data) => {

    let lines = data.split(/\r?\n/);
    //lines = input.split(/\r?\n/);

    lines.forEach(l => {
        let command = l[0];
        let amount = +l.slice(1);
        moveWaypoint(command, amount);
        console.log(x, y, waypoint_x, waypoint_y);
    });
    console.log(Math.abs(x) + Math.abs(y));
});
