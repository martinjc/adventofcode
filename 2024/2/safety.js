let fs = require('fs');

let input = fs.readFileSync('input', 'utf8').split('\n');

let safe = 0;

const reportIsSafe = function(reports) {
    let isSafe = true;

    lastMagnitude = (reports[0] - reports[1]) / (Math.abs(reports[0] - reports[1]));
    
    for(let i = 0; i < reports.length-1; i++) {
        let diff = Math.abs(reports[i] - reports[i+1]);
        if(diff < 1 || diff > 3) {
            isSafe = false;
            break;
        }
        thisMagnitude = (reports[i] - reports[i+1]) / (Math.abs(reports[i] - reports[i+1]));
        //console.log(reports[i], reports[i+1], thisMagnitude, lastMagnitude);
        if(thisMagnitude != lastMagnitude) {
            isSafe = false;
            break;
        }
    }
    return isSafe;
}

const checkPermutations = function(reports) {
    for(let i = 0; i < reports.length; i++) {
        r = reports.toSpliced(i, 1);
        if(reportIsSafe(r)){
            return true;
        }
    }
    return false;
}

for (line of input) {
    let reports = line.split(' ');
    let isSafe = reportIsSafe(reports);
    if(isSafe) {
        safe++;
    } else {
        if(checkPermutations(reports)) {
            safe++;
        }
    }
}

console.log(safe);