const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');

/*
A = Rock, B = Paper, C = Scissors
X = Rock, Y = Paper, Z = Scissors
*/

let shapeScores = {"Rock": 1, "Paper": 2, "Scissors": 3};
let roundDecision = {X: "Lose", Y: "Draw", Z: "Win"};
let roundScores = {X: 0, Y: 3, Z: 6};

let scores = [];

for(round of input) {
    let moves = round.split(' ');
    let theirMove = moves[0];
    let result = moves[1];

    if (theirMove === 'A') {
        if(result === 'X') {
            myMove = 'Scissors';
        } else if (result === 'Y') {
            myMove = 'Rock';
        } else {
            myMove = 'Paper';
        }
    } else if (theirMove === 'B') {
        if(result === 'X') {
            myMove = 'Rock';
        } else if (result === 'Y') {
            myMove = 'Paper';
        } else {
            myMove = 'Scissors';
        }     
    } else if (theirMove === 'C') {
        if(result === 'X') {
            myMove = 'Paper';
        } else if (result === 'Y') {
            myMove = 'Scissors';
        } else {
            myMove = 'Rock';
        }         
    }

    scores.push(shapeScores[myMove] + roundScores[result]);
}
console.log(scores);
console.log(scores.reduce((x, a) => x + a));