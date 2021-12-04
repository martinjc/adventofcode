const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

const numbers = rows[0].split(',').map(n => +n);

boards = rows.slice(2);
console.log(boards);

class Board {
    constructor(rows) {
        this.rows = rows.map(r => r.trim().split(/\s+/));
        this.checked = new Array(this.rows.length).fill(new Array(this.rows[0].length).fill(0));
    }

    checkNumber = (number) => {
        for (let i = 0; i < this.rows.length; i++) {
            for (let j = 0; j < this.rows[i].length; j++) {
                console.log(i, j, this.rows[i][j], number);
                if (this.rows[i][j] === number) {
                    this.checked[i][j] = 'X';
                }
            }
        }
    }

    checkRows = () => {
        return this.checked.find(r => r.every(c => c === 'X'));
    }

    checkColumns = () => {
        for (let i = 0; i < this.checked[0].length; i++) {
            let complete = true;
            for (let j = 0; j < this.checked.length; j++) {
                if (this.checked[j][i] !== 'X') {
                    complete = false;
                }
            }
            if (complete) {
                return true;
            }
        }
        return false;
    }

    print() {
        this.rows.forEach(r => {
            console.log(r);
        });
        this.checked.forEach(r => {
            console.log(r);
        });
    }
}

actualBoards = [];

for (let i = 0; i < boards.length; i += 6) {
    let board_rows = [boards[i], boards[i+1], boards[i+2], boards[i+3], boards[i+4]];
    actualBoards.push(new Board(board_rows));
}

actualBoards.forEach(a => {
    console.log(a);
    a.checkNumber('22');
    console.log(a);
});