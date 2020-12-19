

const input = `#.......
.#..#..#
....#.#.
.##..#.#
#######.
#...####
###.##..
.##.#.#.`;

// z
space = [];
// y
space[0] = []

lines = input.split(/\r?\n/);
    lines.forEach((l, y) => {
    x = l.split('');
    space[0][y] = x;
});

let printSpace = function(space) {
    space.forEach((zi, z) => {
        console.log(`z=${z}`);
        zi.forEach(yi => {
            let row = ``;
            yi.forEach(xi => {
                row += `${xi} `;
            });
            console.log(row);
        });
        console.log('');
    })
}

let createNewSpace = function(zDim, yDim, xDim) {
    let newSpace = [];
    for(let z = 0; z < zDim; z++) {
        newSpace.push(createNewPlane(xDim, yDim));
    }
    return newSpace;
}

let createNewPlane = function(xDim, yDim) {
    let newDim = [];
    for(let y = 0; y < yDim; y++) {
        newDim.push([]);
        for(let x = 0; x < xDim; x++) {
            newDim[y].push('.');
        }
    }
    return newDim;
}

let expandExistingSpace = function(space, xDim) {
    space.forEach(zi => {
        zi.unshift([]);
        zi.push([]);
        zi.forEach(yi => {
            if(yi.length > 0) {
                yi.unshift('.');
                yi.push('.');
            } else {
                for(let x = 0; x < xDim; x++) {
                    yi.push('.');
                }
            }
        });
    });
}

let checkNeighbours = function(space, z, y, x) {
    let activeCount = 0;
    for(let zd = -1; zd <= 1; zd++) {
        for(let yd = -1; yd <= 1; yd++) {
            for(let xd = -1; xd <= 1; xd++) {
                if(!((z+zd) === z && (y + yd) === y && (x + xd) === x)) {
                    if(space[z+zd][y+yd][x+xd] === '#') {
                        activeCount++;
                    }
                }
            }
        }
    }
    if(space[z][y][x] === '#') {
        if (activeCount === 2 || activeCount === 3) {
            return '#';
        } else {
            return '.';
        }
    } else if (space[z][y][x] === '.') {
        if (activeCount === 3) {
            return '#';
        }
        else {
            return '.'
        }
    }
}

let step = function(space, zDim, yDim, xDim) {

    let newSpace = createNewSpace(zDim, yDim, zDim);

    for(let zi = 0; zi < zDim; zi++) {
        for(let yi = 0; yi < yDim; yi++) {
            for(let xi = 0; xi< xDim; xi++) {
                if(zi > 0 && yi > 0 && xi > 0 && zi < zDim-1 && yi < yDim-1 && xi < xDim-1) {
                    newSpace[zi][yi][xi] = checkNeighbours(space, zi, yi, xi);
                } else {
                    newSpace[zi][yi][xi] = space[zi][yi][xi];
                }
            }
        }
    }

    return newSpace;
}

console.log('starting')
printSpace(space);
expandExistingSpace(space, space[0][0].length+2);
printSpace(space);


let currentXDim = space[0][0].length;
let currentYDim = space[0].length;


space.unshift(createNewPlane(currentXDim, currentYDim));
space.push(createNewPlane(currentXDim, currentYDim));

let currentZDim = space.length;

printSpace(space);

printSpace(space);

for(let cycle = 0; cycle < 6; cycle++) {
    expandExistingSpace(space, space[0][0].length+2);
    printSpace(space);
    currentXDim = space[0][0].length;
    currentYDim = space[0].length;
    space.unshift(createNewPlane(currentXDim, currentYDim));
    space.push(createNewPlane(currentXDim, currentYDim));
    currentZDim = space.length;
    printSpace(space);
    // here is where we check neighbours for the cycle
    space = step(space, currentZDim, currentYDim, currentXDim);
    console.log('calculated neighbours')
    printSpace(space);    
}

let total = 0;
space.forEach(zi => {
    zi.forEach(yi => {
        yi.forEach(xi => {
            if(xi === '#') {
                total += 1;
            }
        });
    });
});
console.log(total);
