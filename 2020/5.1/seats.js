const fs = require('fs');

let bisectSeats = function(str, position, lastPosition, begin, end) {
    if(position === lastPosition) {
        if (str[position] === 'F' || str[position] === 'L') {
            return begin;
        } else if (str[position] === 'B' || str[position] === 'R') {
            return end;
        }
    } else {
        let mid = Math.floor((begin + end)/2);
        if(str[position] === 'F' || str[position] === 'L') {
            return bisectSeats(str, ++position, lastPosition, begin, mid);
        } else if(str[position] === 'B' || str[position] === 'R') {
            return bisectSeats(str, ++position, lastPosition,  mid + 1, end);
        }
    }
}

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    let maxID = 0;
    lines.forEach(l => {
        let row = bisectSeats(l, 0, 6, 0, 127);
        let column = bisectSeats(l, 7, 9, 0, 7);
        let seatID = (row * 8) + column;
        maxID = Math.max(maxID, seatID);
    });
    console.log(maxID);
});