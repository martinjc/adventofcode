const fs = require('fs');

let seats = [];
let newSeats = [];

let input = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

let outputSeats = function(seats) {
    let str = '';
    seats.forEach(s => {
        str += s.join('');
        str += '\n';
    });
    return str;
}

let validSeat = function(seats, x, y) {
    return (x >= 0) && (y >= 0) && (x < seats.length) && (y < seats[x].length);
}

let seatsChanged = function(newSeats, oldSeats) {
    return newSeats.some((nSR, i) => {
        return nSR.some((nSC, j) => {
            return newSeats[i][j] !== oldSeats[i][j];
        });
    })
}

let canSeeOccupied = function(seats, x, y, dx, dy) {
    while (validSeat(seats, x+dx, y+dy)) {
        x = x+dx;
        y = y+dy;
        if(seats[x][y] === '#') {
            return true;
        } else if(seats[x][y] === 'L') {
            return false;
        }
    }
    return  false;
}


let checkSeat = function(seats, x, y) {
    let countOccupied = 0;
    // check north
    if(canSeeOccupied(seats, x, y, -1, 0)) {
        // console.log(`x: ${x}, y: ${y}, north can see occupied`);
        countOccupied++;
    }
    // check south
    if(canSeeOccupied(seats, x, y, 1, 0)) {
        // console.log(`x: ${x}, y: ${y}, south can see occupied`);
        countOccupied++;
    }
    // check west
    if(canSeeOccupied(seats, x, y, 0, -1)) {
        // console.log(`x: ${x}, y: ${y}, west can see occupied`);
        countOccupied++;
    }
    // check east
    if(canSeeOccupied(seats, x, y, 0, 1)) {
        // console.log(`x: ${x}, y: ${y}, east can see occupied`);
        countOccupied++;
    }
    // check north-west
    if(canSeeOccupied(seats, x, y, -1, -1)) {
        // console.log(`x: ${x}, y: ${y}, north-west can see occupied`);
        countOccupied++;
    }
    // check north-east
    if(canSeeOccupied(seats, x, y, -1, 1)) {
        // console.log(`x: ${x}, y: ${y}, north-east can see occupied`);
        countOccupied++;
    }
    // check south-west
    if(canSeeOccupied(seats, x, y, 1, -1)) {
        // console.log(`x: ${x}, y: ${y}, south-west can see occupied`);
        countOccupied++;
    }
    // check south-east
    if(canSeeOccupied(seats, x, y, 1, 1)) {
        // console.log(`x: ${x}, y: ${y}, south-east can see occupied`);
        countOccupied++;
    }  
    if(seats[x][y] === 'L' && countOccupied === 0) {
        return '#';
    } else if (seats[x][y] === '#' && countOccupied >= 5) {
        return 'L'
    } else {
        return seats[x][y]
    }
}

fs.readFile('input', 'utf-8', (err, data) => {
    let lines = data.split(/\r?\n/);
    //lines = input.split(/\r?\n/);
    lines.forEach((l, i) => {
        seats.push(new Array(l.length));
        newSeats.push(new Array(l.length));
        for(let j = 0; j < l.length; j++) {
            newSeats[i][j] =l[j];
        }
    });
    let count = 0;
    do {
        newSeats.forEach((sR, i) => {
            sR.forEach((s, j) => {
                seats[i][j] = newSeats[i][j];
            });
        });
        newSeats.forEach((sR, i) => {
            sR.forEach((s, j) => {
                newSeats[i][j] = checkSeat(seats, i, j);
            });
        });
        count++;
        //console.log(count);
        //console.log(outputSeats(newSeats));
    } while(seatsChanged(newSeats, seats));
    
    //} while(count < 2);
    console.log(count);
    let countOccupied = 0;
    for(let i = 0; i < newSeats.length; i++) {
        for(let j = 0; j < newSeats[i].length; j++) {
            if(newSeats[i][j] === '#') {
                countOccupied++;
            }
        }
    }
    console.log(countOccupied);
});
