const fs = require('fs');

let leadsFromShinyGold = function(tree, key, number) {
    if(tree[key].length === 0) {
        return number;
    } else {
        return sum = number + number * tree[key].reduce((acc, a,) => {
            let numBags = +a[0];
            let numSubBags = leadsFromShinyGold(tree, a.slice(2), numBags);
            return acc + numSubBags;
        }, 0);
    }
};

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);

    let tree = {};

    lines.forEach(l => {
        let bags = l.split(' bags contain ');
        let starter = bags[0].trim();
        let others = bags[1];
        if(others === 'no other bags.') {
            tree[starter] = [];
        } else {
            others = others.split(', ');
            let other_colours = others.map(o => {
                return o.replace('bags', '').replace('bag', '').replace('.', '').trim();
            });
            tree[starter] = other_colours;
        }
    });
    console.log(leadsFromShinyGold(tree, 'shiny gold', 1)-1);
});