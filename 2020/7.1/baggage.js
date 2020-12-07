const fs = require('fs');

let leadsToShinyGold = function(tree, key) {
    if(tree[key].length === 0) {
        return false;
    } else if(tree[key].includes('shiny gold')) {
        return true;
    } else if(tree[key].length === 1) {
        return leadsToShinyGold(tree, tree[key]);
    } else {
        return tree[key].some(a => {
            return leadsToShinyGold(tree, a);
        });
    }
};

fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);

    let tree = {}

    lines.forEach(l => {
        let bags = l.split(' bags contain ');
        let starter = bags[0];
        let others = bags[1];
        if(others === 'no other bags.') {
            tree[starter] = [];
        } else {
            others = others.split(', ');
            let other_colours = others.map(o => {
                return o.replace('bags', '').replace('bag', '').replace('.', '').slice(1).trim();
            });
            tree[starter] = other_colours;
        }

    });
    let goodBags = new Set();
    for(let starter of Object.keys(tree)) {
        if(!goodBags.has(starter)) {
            if(leadsToShinyGold(tree, starter)) {
                goodBags.add(starter);
            }
        }
    }
    console.log(goodBags.size);
});