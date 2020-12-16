const fs = require('fs');
const { isRegExp } = require('util');

const input = `class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`;

let extractRules = function(rules) {
    let returnRules = {};
    rules.forEach(r => {
        let identifier = r.split(': ')[0];
        returnRules[identifier] = {};
        let [lower, upper] = r.split(': ')[1].split(' or ');
        returnRules[identifier]['lower'] = lower.split('-');
        returnRules[identifier]['upper'] = upper.split('-');
        returnRules[identifier]['position'] = [];
    });
    return returnRules;
}

let validTicket = function(ranges, ticket) {
    return ticket.every(t => {
        return Object.values(ranges).some(r => {
            return (+t >= +r.lower[0] && +t <= +r.lower[1] || +t >= +r.upper[0] && +t <= +r.upper[1])
        })
    });
}


fs.readFile('input', 'utf-8', (err, data) => {

    lines = data.split(/\r?\n/);
    //lines = input.split(/\r?\n/);

    let rules = [];
    let myTicket = undefined;
    let nearbyTickets = [];

    let seenYourTicket = false;
    let seenNearbyTickets = false;

    lines.forEach(l => {
        if(l.startsWith('your ticket:')) {
            seenYourTicket = true;
        }
        if(l.startsWith('nearby tickets:')) {
            seenNearbyTickets = true;
        }
        if(!seenYourTicket && l !== '') {
                rules.push(l);
        } else if(seenYourTicket && !seenNearbyTickets && l !== '' && !l.startsWith('your ticket:')) {
                myTicket = l.split(',');
        } else if(seenNearbyTickets && l !== '' && !l.startsWith('nearby tickets:')) {
            nearbyTickets.push(l.split(','));
        }
    });
    let ranges = extractRules(rules);
    let validTickets = nearbyTickets.filter(n => {
        return validTicket(ranges, n);
    });
    let numValues = validTickets[0].length;

    let pivot = [];
    for(let i = 0; i < numValues; i++) {
        pivot[i] = [];
    }
    validTickets.forEach((t)=>{
        t.forEach((v, i) => {
            pivot[i].push(v);
        });
    });

    let reduceTo1 = function(i) {
        for(let definition in ranges) {
            if(ranges[definition].position.includes(i)) {
                ranges[definition].position = [i];
            }
        }
    }

    let findOnlyPosition = function(numOptions) {
        let possiblePositions = [];
        for(let i = 0; i < numOptions; i++) {
            let numPossible = Object.values(ranges).filter(r => {
                return r.position.includes(i);
            }).length;
            possiblePositions[i] = numPossible;
        }
        for(let i = 0; i < possiblePositions.length; i++) {
            if(possiblePositions[i] === 1) {
                reduceTo1(i);
            }
        }
    }

    let hasMultipleOptions =function() {
        return Object.values(ranges).some((r => {
            return r.position.length > 1;
        }))
    }

    let findPossibleDefinitions = function(values) {
        for(definition in ranges) {
            let lower = ranges[definition].lower;
            let upper = ranges[definition].upper;
            values.forEach((t, i) => {
                let valid = t.every(v => {
                    return (+v >= +lower[0] && +v <= +lower[1] || +v >= +upper[0] && +v <= +upper[1]);
                });
                if(valid) {
                    ranges[definition].position.push(i);
                }
            });
        }
    }
    findPossibleDefinitions(pivot);
    while(hasMultipleOptions()) {
        findOnlyPosition(pivot.length);
    }
    let total = 1;
    for(definition in ranges) {
        if(definition.startsWith('departure')) {
            total *= +myTicket[ranges[definition].position[0]]
        }
    }
    console.log(total);

});