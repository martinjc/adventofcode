const fs = require('fs');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

const numbers = rows[0].split(',').map(n => +n);

board_input = rows.slice(2);
console.log(board_input);

class Board {
    constructor(rows) {
        this.rows = rows.map(r => r.trim().split(/\s+/).map(n => +n));
        this.columns = [];
        for (let i = 0; i < this.rows[0].length; i++) {
            this.columns.push([this.rows[0][i], this.rows[1][i], this.rows[2][i], this.rows[3][i], this.rows[4][i]]);
        }
    }

    checkRowNumbers(numbers) {
        return this.rows.some(r => {
            return r.every(n => numbers.includes(n));
        });
    }

    checkColumnNumbers(numbers) {
        return this.columns.some(c => {
            return c.every(n => numbers.includes(n));
        });
    }

    checkNumbers(numbers) {
        return this.checkColumnNumbers(numbers) || this.checkRowNumbers(numbers);
    }

    filterAndSum(numbers) {
        this.values = this.rows.flat();
        this.values = this.values.filter(v => !numbers.includes(v));
        return this.values.reduce((a, i) => a + i);
    }
}

boards = [];

for (let i = 0; i < board_input.length; i += 6) {
    let board_rows = [board_input[i], board_input[i+1], board_input[i+2], board_input[i+3], board_input[i+4]];
    boards.push(new Board(board_rows));
}

function findBoard(boards, numbers) {

    let wins = new Array(boards.length).fill(0);

    for (let j = 0; j < boards.length; j++) {
        for (let i = 0; i < numbers.length; i++) {
            let found = boards[j].checkNumbers(numbers.slice(0, i));
            if (found) {
                wins[j] = i;
                break;
            }
        }
    }

    let maxWin = 0;
    let maxWinBoard = 0;
    for (let i = 0; i < wins.length; i++) {
        if (wins[i] > maxWin) {
            maxWin = wins[i];
            maxWinBoard = i;
        }
    }
    return [boards[maxWinBoard], maxWinBoard, maxWin];
}

result = findBoard(boards, numbers);
console.log(result);
console.log(numbers[result[2] - 1]);
let sum = result[0].filterAndSum(numbers.slice(0, result[2]));
console.log(sum, numbers[result[2]-1], sum * numbers[result[2]-1]);


