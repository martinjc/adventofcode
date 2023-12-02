let fs = require('fs')

let input = fs.readFileSync('input', 'utf8').split('\n');

const RED = 12;
const GREEN = 13;
const BLUE = 14;

let sum = 0;

function checkValid(games) {
    for(game of games) {
        if(!isValid(game)) {
            return false;
        }
    }
    return true;
}

function isValid(game) {
    let balls = game.split(', ');
    for(ball of balls) {
        let color = ball.split(' ')[1];
        let number = +ball.split(' ')[0];
        if (color === 'red' && number > RED) {
            return false;
        } else if (color === 'green' && number > GREEN) {
            return false;
        } else if (color === 'blue' && number > BLUE) {
            return false;
        }
    }
    return true;
}

for (line of input) {
    let gameNumber = +line.split(': ')[0].replace('Game ', '');
    let games = line.split(': ')[1].split('; ');
    if (checkValid(games)) {
        sum += gameNumber;
    }
}

console.log(sum);