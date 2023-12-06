let fs = require('fs')

let input = fs.readFileSync('input', 'utf-8').split('\n');

class Map {
    constructor(destination, source, range) {
        this.destination = destination;
        this.source = source;
        this.range = range;
    }
}

let maps = {};
let seeds = input[0].replace('seeds: ', '').match(/\d+/g).map(v => +v);
console.log(seeds);

let currentMap;

for(line of input.slice(1)) {
    console.log(line);
    if(line === '') {
        continue;
    } else if(line.includes('map')) {
        currentMap = line.replace(' map:', '');
    } else {
        let m = line.match(/\d+/g);
        let map = new Map(+m[0], +m[1], +m[2]);
        if(!maps[currentMap]) maps[currentMap] = [];
        maps[currentMap].push(map);
    }
}

console.log(maps);

let targets = [];
let min = Number.MAX_SAFE_INTEGER;

for(let i = 0; i < seeds.length; i += 2) {
    let seedStart = seeds[i];
    let range = seeds[i+1];
    let seedEnd = seedStart + range;
    while(seedStart < seedEnd) {
        let seed = seedStart;
        for(map of Object.keys(maps)) {
            let currentMap = maps[map];
            for(m of currentMap) {
                if(seed >= m.source && seed <= m.source + m.range) {
                    seed = m.destination + (seed - m.source);
                    break;
                }
            }
        }
        seedStart++;
        if (min > seed) {
            min = seed;
        }
    }
}

console.log(min);