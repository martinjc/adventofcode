const fs = require('fs');
const { rawListeners } = require('process');

const input = `0: 4 1 5
1: 2 3 | 3 2
2: 4 4 | 5 5
3: 4 5 | 5 4
4: "a"
5: "b"

ababbb
bababa
abbbab
aaabbb
aaaabbb`;

let rules = [];


let extract_rule = function(l) {
    let index = +l[0];
    let rule = l.split(': ')[1];
    while(rule.includes('"')) {
        rule = rule.replace('"', '');
    }
    while(rule.includes(' ')) {
        rule = rule.replace(' ', '');
    }
    rules[index] = rule;
}

let reduceRules = function() {
    let a = rules.findIndex(r => r === 'a');
    let b = rules.findIndex(r => r === 'b');
    rules = rules.map(r => {
        while(r.includes(a)) {
            r = r.replace(a, rules[a]);
        }
        return r;
    });
    rules = rules.map(r => {
        while(r.includes(b)) {
            r = r.replace(b, rules[b]);
        }
        return r;
    });
}

fs.readFile('input', 'utf-8', (err, data) => {
    let lines = input.split(/\r?\n/);

    lines.forEach(l => {
        if(l.includes(':')) {
            extract_rule(l);
        }
    });
    console.log(rules);
    reduceRules();
    console.log(rules);

    //console.log(rulesHaveKeys());

})