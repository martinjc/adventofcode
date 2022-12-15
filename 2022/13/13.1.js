const fs = require('fs');
const { isReadable } = require('stream');

let input = fs.readFileSync('input', 'utf-8').split('\n');

// function compare(l, r) {
//     for (let i = 0; i < l.length; i++) {
//         if (r[i]) {
//             if (l[i] < r[i]) {
//                 return true;
//             } else if (l[i] > r[i]) {
//                 return false;
//             }
//         } else {
//             return false;
//         }
//     }
//     return true;
// }

function compare(l, r) {ß
    if (typeof (l) === 'number' && typeof (r) === 'number') {
        return l - r;
    } else if ((typeof (l) === 'number' && typeof (r) === 'object')) {
        return compare([l], r);
    } else if ((typeof (r) === 'number' && typeof (l) === 'object')) {
        return compare(l, [r]);
    } else {
        for (let i = 0; i < l.length; i++) {
            if (r[i]) {
                let check = compare(l[i], r[i]);
                if (check === 0) {
                    continue;
                }
            } else {
                return false;
            }
        }
    }
    return undefined;
}

let sum = 0;
let passing = []
for (let i = 0; i < input.length; i += 3) {
    let left = JSON.parse(input[i]).flat(Infinity);
    let right = JSON.parse(input[i + 1]).flat(Infinity);

    console.log(left, right);
    let pass = compare(left, right);
    //console.log(pass);
    if (pass === true) {
        console.log('i', i);
        sum += (Math.floor(i / 3) + 1);
        passing.push(Math.floor(i / 3) + 1);
    }
    if (pass === undefined) {
        console.log('++++++++++HELP+++++++++');
    }
}
console.log(passing);
console.log(sum);