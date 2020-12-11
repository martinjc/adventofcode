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
    for(let i = -1; i <= 1; i++) {
        for(let j = -1; j <= 1; j++) {
            if(!(i ===  0 && j === 0)) {
                if((x + i) >= 0 && (y + j) >= 0 && (x + i) < seats.length && (y + j) < seats[x+i].length) {
                    if(seats[x+i][y+j] === '#') {
                        countOccupied++;
                    }
                }
            }
        }
    }
    if(seats[x][y] === 'L' && countOccupied === 0) {
        return '#';
    } else if (seats[x][y] === '#' && countOccupied >= 4) {
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
