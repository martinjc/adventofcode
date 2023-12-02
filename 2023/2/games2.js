let fs = require('fs')

let input = fs.readFileSync('input', 'utf8').split('\n');
let sum = 0;

for (line of input) {
    let gameNumber = +line.split(': ')[0].replace('Game ', '');
    let games = line.split(': ')[1].split('; ');
    let counts = {'red': 0, 'green': 0, 'blue': 0};
    for (game of games) {
        let balls = game.split(', ');
        for(ball of balls) {
            let color = ball.split(' ')[1];
            let number = +ball.split(' ')[0];
            if(counts[color] < number) {
                counts[color] = number;
            }
        }
    }
    console.log(counts);
    let power = counts['red'] * counts['green'] * counts['blue'];
    sum += power;
}

console.log(sum);