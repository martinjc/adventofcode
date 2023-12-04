let fs = require('fs')

let input = fs.readFileSync('input', 'utf-8').split('\n');

let scores = [];

class Card {
    constructor(card, winningNumbers, ourNumbers) {
        this.card = card;
        this.winningNumbers = winningNumbers;
        this.winningNumbers = ourNumbers;
        this.matches = ourNumbers.filter(v => winningNumbers.includes(v));
        this.copies = 1;
    }
}

let cards = [];

for(line of input) {
    let card = line.split(': ')[0];
    let winningNumbers = line.split(': ')[1].split(' | ')[0].match(/\d+/g).map(v => +v);
    let ourNumbers = line.split(': ')[1].split(' | ')[1].match(/\d+/g).map(v => +v);
    let matches = ourNumbers.filter(v => winningNumbers.includes(v));
    let score = matches.length > 0 ? Math.pow(2, matches.length-1) : 0;
    scores.push({'card': card, 'score': score});
}
// console.log(scores);
// console.log(scores.reduce((acc, s) => acc + s.score, 0));

for(line of input) {
    let card = new Card(
        line.split(': ')[0],
        line.split(': ')[1].split(' | ')[0].match(/\d+/g).map(v => +v),
        line.split(': ')[1].split(' | ')[1].match(/\d+/g).map(v => +v),
    );
    cards.push(card);
}

for(let i = 0; i < cards.length; i++) {
    if(cards[i].matches.length > 0) {
        for(let j = i+1; j <= i+cards[i].matches.length; j++) {
            cards[j].copies += cards[i].copies;
        }
    }
}

// cards.forEach((c, i) => {
//     if(c.matches.length > 0) {
//         for(let j = i+1; j < i+c.matches.length; i++) {
//             cards[j].copies++;
//         }
//     }
// });

console.log(cards);
console.log(cards.reduce((a, c) => a + c.copies, 0));