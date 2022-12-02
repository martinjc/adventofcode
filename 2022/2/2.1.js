const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');

/*
A = Rock, B = Paper, C = Scissors
X = Rock, Y = Paper, Z = Scissors
*/

let shapeScores = {X: 1, Y: 2, Z: 3};
let roundScores = {"Lose": 0, "Draw": 3, "Win": 6};

let scores = [];

for(round of input) {
    let moves = round.split(' ');
    let theirMove = moves[0];
    let myMove = moves[1];

    let result = undefined;
    if (theirMove === 'A') {
        if(myMove === 'X') {
            result = 'Draw';
        } else if (myMove === 'Y') {
            result = 'Win';
        } else {
            result = 'Lose';
        }
    } else if (theirMove === 'B') {
        if(myMove === 'X') {
            result = 'Lose';
        } else if (myMove === 'Y') {
            result = 'Draw';
        } else {
            result = 'Win';
        }        
    } else if (theirMove === 'C') {
        if(myMove === 'X') {
            result = 'Win';
        } else if (myMove === 'Y') {
            result = 'Lose';
        } else {
            result = 'Draw';
        }          
    }

    scores.push(shapeScores[myMove] + roundScores[result]);
}
console.log(scores);
console.log(scores.reduce((x, a) => x + a));