const fs = require('fs');

let expression = `1 + (2 * 3) + (4 * (5 + 6))
2 * 3 + (4 * 5)`;

const brackets_re = /(\(\d+\s[+*/-]\s\d+(\s[+*/-]\s\d+)*\))/g;


let doOperation = function(opers) {
    let value = 0;
    if(opers[1] === '+') {
        value = +opers[0] + +opers[2];
    } else if(opers[1] === '-') {
        value = +opers[0] - +opers[2];
    } else if(opers[1] === '*') {
        value = +opers[0] * +opers[2];
    } else if(opers[1] === '/') {
        value = +opers[0] / +opers[2];
    }
    return value;
}

let removeBrackets = function(stringExpression) {
    let brackets = stringExpression.matchAll(brackets_re);
    let b = brackets.next();
    while(!b.done) {
        stringExpression = stringExpression.replace(b.value[0], consumeExpression(b.value[1].replace('(', '').replace(')', '')));
        b = brackets.next();
    }
    return stringExpression;
}

let consumeExpression = function(expression) {
    let opers = expression.split(' ');
    while(opers.find(a => a === '+')) {
        let add = opers.findIndex(a => a === '+');
        let value = doOperation(opers.slice(add-1, add+2));
        opers.splice(add-1, 3, value);
    }
    while(opers.length > 1) {
        let value = doOperation(opers.slice(0,3));
        opers = opers.slice(3);
        opers.unshift(value);
    }
    return opers[0];
}

let total = 0;


fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    lines.forEach(l => {
        
        while(l.includes('(') || l.includes(')')) {
            l = removeBrackets(l);
        }
        l = consumeExpression(l);

        total += +l;
    })
    console.log(total);

});




