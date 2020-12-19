const fs = require('fs')

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

let rules = {}

let rulesHaveKeys = function() {
    return Object.values(rules).some(r => {
        return Object.keys(rules).some(k => {
            return r.includes(k);
        })
    });
}

let extract_rule = function(l) {
    let key = l[0];
    let rule = l.split(': ')[1];
    rules[key] = rule;
}

let reduceRules = function() {
    //while(rulesHaveKeys()) {
        Object.values(rules).forEach(r => {
            console.log(r);
            Object.keys(rules).forEach(k => {
                console.log(k);
                if(r.includes(k)) {
                    console.log(k, r, rules[k]);
                    console.log(r.replace(k, rules[k]))
                    rules[k] = r.replace(k, `(${rules[k]})`);
                }
            });
        });
    //
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

    console.log(rulesHaveKeys());

})