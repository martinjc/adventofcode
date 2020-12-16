const fs = require('fs');

const input = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`;

let extractRules = function(rules) {
    let returnRanges = [];
    rules.forEach(r => {
        let ranges = r.split(': ')[1].split(' or ');
        ranges.forEach(range => {
            returnRanges.push(range.split('-'))
        });
    });
    return returnRanges;
}

let notValid = function(ranges, ticket) {
    return ticket.every(t => {
        return !ranges.some(r => {
            return (+t > +r[0] && +t < +r[1]);
        });
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
    console.log(rules);
    console.log(myTicket);
    console.log(nearbyTickets);
    let ranges = extractRules(rules);
    console.log(ranges);
    let invalidTotal = 0;
    nearbyTickets.forEach(n => {
        console.log(n);
        let valid = n.every(v => {
            let valueValid = ranges.some(r => {
                //console.log(r, v);
                //console.log(+v >= +r[0] && +v <= +r[1]);
                return (+v >= +r[0] && +v <= +r[1]);
            });
            if(!valueValid) {
                invalidTotal += +v;
            }
            return valueValid
        })
        console.log(valid);
    });
    console.log(invalidTotal);

});