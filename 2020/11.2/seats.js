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

let seatsChanged = function(newSeats, oldSeats) {
    return newSeats.some((nSR, i) => {
        return nSR.some((nSC, j) => {
            return newSeats[i][j] !== oldSeats[i][j];
        });
    })
}

let checkSeat = function(seats, x, y) {
    let countOccupied = 0;
    // check north
    if(x > 0) {
        for(let i = x-1; i >= 0; i--) {
            if(seats[i][y] === '#') {
                countOccupied++;
                break;
            } else if(seats[x][i] === 'L') {
                break;
            }
        }
    }
    // check south
    if(x < seats.length) {
        for(let i = x+1; i < seats.length; i++) {
            if(seats[i][y] === '#') {
                countOccupied++;
                break;
            } else if(seats[i][y] === 'L') {
                break;
            }
        }
    }
    // check west
    if(y > 0) {
        for(let i = y-1; i >= 0; i--) {
            if(seats[x][i] === '#') {
                countOccupied++;
                break;
            } else if(seats[x][i] === 'L') {
                break;
            }
        }
    }
    // check east
    if(y < seats[x].length) {
        for(let i = y+1; i < seats[x].length; i++) {
            if(seats[x][i] === '#') {
                countOccupied++;
                break;
            } else if(seats[x][i] === 'L') {
                break;
            }
        }
    }
    // check north-west
    if(x > 0 && y > 0) {
        for(let i = 1; (x-i >= 0) && (y-i >= 0); i++) {
            if(seats[x-i][y-i] === '#') {
                countOccupied++;
                break;
            } else if(seats[x-i][y-i] === 'L') {
                break;
            }
        }
    }
    // check north-east
    if(x > 0 && y < seats[x].length) {
        for(let i = 1; (x-i >= 0) && (y+i < seats[x-i].length); i++) {
            if(seats[x-i][y+i] === '#') {
                countOccupied++;
                break;
            } else if(seats[x-i][y+i] === 'L') {
                break;
            }
        }
    }
    // check south-west
    if(x < seats.length && y > 0) {
        for(let i = 1; (x+i < seats.length) && (y-i >= 0); i++) {
            if(seats[x+i][y-i] === '#') {
                countOccupied++;
                break;
            } else if(seats[x+i][y-i] === 'L') {
                break;
            }
        }
    }
    // check south-east
    if(x < seats.length && y < seats[x].length) {
        for(let i = 1; (x+i < seats.length) && (y+i < seats[x+i].length); i++) {
            if(seats[x+i][y+i] === '#') {
                countOccupied++;
                break;
            } else if(seats[x+i][y+i] === 'L') {
                break;
            }
        }
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
    } while(seatsChanged(newSeats, seats));
    //} while(count < 6);
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
