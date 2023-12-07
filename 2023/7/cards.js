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
        this.counts = {};
        CARDS.forEach(card => {
            let matches = this.cards.match(new RegExp(card, 'g'))
            if(matches !== null) {
                this.counts[card] = matches;
            } else {
                this.counts[card] = [];
            }
        });
        this.newCards = this.cards;
        if(this.counts['J'].length > 0) {
            let max = Math.max(...Object.values(this.counts).map(c => c.length));
            if(max === 5) {
                if(this.counts['J'].length === max) {
                    this.counts['J'] = [];
                    this.counts['A'] = ['A', 'A', 'A', 'A', 'A'];
                    this.newCards = 'AAAAA';
                }
            } else if (this.counts['J'].length === max) {
                for(let i = CARDS.length-1; i >= 0; i--) {
                    if(this.counts[CARDS[i]].length > 0) {
                        for(let j = 0; j < max; j++) {
                            this.counts[CARDS[i]].push(CARDS[i]);
                            this.counts['J'].pop();
                            this.newCards = this.newCards.replace('J', CARDS[i]);
                        }
                        break;
                    }
                } 
            } else {
                for(let i = CARDS.length-1; i >= 0; i--) {
                    if(this.counts[CARDS[i]].length === max) {
                        for(let j = 0; j < max; j++) {
                            this.counts[CARDS[i]].push(CARDS[i]);
                            this.counts['J'].pop();
                            this.newCards = this.newCards.replace('J', CARDS[i]);                        
                        }
                        break;
                    }
                }
            }
        }
        this.pattern = Object.values(this.counts).filter(c => c.length > 0).sort((a, b) => b.length - a.length).reduce((a, b) => a + b.length, '');
        this.score = TYPES[this.pattern];
        this.totalScore = 0;
    }

    toString() {
        return `${this.cards} ${this.newCards} ${this.bid} ${this.score} ${this.totalScore}`;
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
