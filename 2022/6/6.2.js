const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');
//let input = ['nppdvjthqldpwncqszvftbrmjlhg'];

function checkMatches(chars) {
    for(let i = 0; i < chars.length; i++) {
        for(let j = i+1; j < chars.length; j++) {
            if(chars[i] === chars[j]) {
                return true
            }
        }
    }
    return false;
}



for(line of input) {
    let chars = line.split('');
    for(let i = 0; i < chars.length; i++) {
        if(!checkMatches(chars.slice(i,i+14))) {
            console.log(i+14);
            break;
        }
    }
}