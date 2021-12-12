const fs = require('fs');
const path = require('path/posix');

const data = fs.readFileSync('input', 'utf-8');
let rows = data.split(/\r?\n/);

edges = {};
rows.forEach(r => {
    let caves = r.split('-');
    if (edges[caves[0]]) {
        edges[caves[0]].push(caves[1]);
    } else {
        edges[caves[0]] = [caves[1]];
    }
    if (edges[caves[1]]) {
        edges[caves[1]].push(caves[0]);
    } else {
        edges[caves[1]] = [caves[0]];
    }
});
console.log(edges);

let paths = [];

function checkTwoSmall(path) {
    let lowerCase = path.filter(f => f === f.toLowerCase());
    return lowerCase.some(l => path.filter(f => f === l).length > 1);
}

function dfs(current, currentPath) {
    currentPath.push(current);
    let numPaths = 0;
    for (let destination of edges[current]) {
        // we've found the end of the path
        if (destination === "start") {
            // do nothing
        } else if (destination === "end") {
            paths.push(currentPath);
            numPaths++;
        // if it's an uppercase destination, don't mark it as visited
        } else if (destination === destination.toUpperCase()) {
            numPaths += dfs(destination, new Array(...currentPath));
        // it must be a lowercase, check we've not already been there
        } else if (!(currentPath.includes(destination)) || (currentPath.includes(destination) && !checkTwoSmall(currentPath))) {
            numPaths += dfs(destination, new Array(...currentPath));
        }
    }
    return numPaths;
}

console.log(dfs("start", new Array()));
console.table(paths);