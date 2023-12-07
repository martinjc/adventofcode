let fs = require('fs')

let input = fs.readFileSync('input', 'utf-8').split('\n');

const CARDS = ['J', '2','3','4','5','6','7','8','9','T','Q','K','A'];

const TYPES = {
    '5': 7,
    '41': 6,
    '32': 5,
    '311': 4,
    '221': 3,
    '2111': 2,
    '11111': 1
}

class Hand {
    constructor(cards, bid) {
        this.cards = cards;
        this.bid = bid;
        this.counts = [];

        CARDS.forEach(card => {
            let matches = this.cards.match(new RegExp(card, 'g'))
            if(matches !== null) {
                this.counts.push([card, matches.length]);
            }
        });

        this.newCards = this.cards;

        this.counts.sort((a, b) => {
            if(b[1] === a[1]) {
                return CARDS.indexOf(b[0]) - CARDS.indexOf(a[0]);
            } else {
                return b[1] - a[1];
            }
        });

        if(this.counts[0][0] === 'J') {
            if(this.counts[0][1] === 5) {
                this.newCards = 'AAAAA';
            } else {
                this.newCards = this.newCards.replaceAll(new RegExp('J', 'g'), this.counts[1][0]);
            }
        } else {
            this.newCards = this.newCards.replaceAll(new RegExp('J', 'g'), this.counts[0][0]);
        }

        this.counts = [];

        CARDS.forEach(card => {
            let matches = this.newCards.match(new RegExp(card, 'g'))
            if(matches !== null) {
                this.counts.push([card, matches.length]);
            }
        });

        this.counts.sort((a, b) => {
            if(b[1] === a[1]) {
                return CARDS.indexOf(b[0]) - CARDS.indexOf(a[0]);
            } else {
                return b[1] - a[1];
            }
        });

        this.pattern = this.counts.reduce((a, b) => a + b[1], '');
        this.score = TYPES[this.pattern];
        this.totalScore = 0;
    }

    toString() {
        return `${this.cards}\t${this.newCards}\t${this.pattern}\t${this.bid}\t${this.score}\t${this.totalScore}`;
    }
}

let hands = [];

for(line of input) {
    console.log(line);
    let hand = new Hand(line.split(' ')[0], line.split(' ')[1]);
    hands.push(hand);
}

for(h of hands) {
    console.log(h.toString());
}

console.log('---SORTING---');

hands.sort((a, b) => { 
    if (a.score === b.score) {
        let i = 0;
        while(a.cards[i] === b.cards[i] && i < a.cards.length) {
            i++;
        }
        return CARDS.indexOf(a.cards[i]) - CARDS.indexOf(b.cards[i]);
    } else {
        return a.score - b.score;
    }
});

for([i, h] of hands.entries()) {
    h.totalScore = (i + 1) * h.bid;
    console.log(h.toString());
}

console.log(hands.reduce((a, b) => a + b.totalScore, 0))
