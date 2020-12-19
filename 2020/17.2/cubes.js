

const input = `#.......
.#..#..#
....#.#.
.##..#.#
#######.
#...####
###.##..
.##.#.#.`;

// w
space = [];
// z
space[0] = []
// y
space[0][0] = []

lines = input.split(/\r?\n/);
    lines.forEach((l, y) => {
    x = l.split('');
    space[0][0][y] = x;
});

let printSpace = function(space) {
    space.forEach((wi, w) => {
        wi.forEach((zi, z) => {
            console.log(`z=${z}, w=${w}`);
            zi.forEach(yi => {
                let row = ``;
                yi.forEach(xi => {
                    row += `${xi} `;
                });
                console.log(row);
            });
            console.log('');
        });
    });
}

let createNewSpace = function(wDim, zDim, yDim, xDim) {
    let newSpace = [];
    for(let w = 0; w < wDim; w++) {
        newSpace.push(createNewCube(zDim, yDim, xDim));
    }
    return newSpace;
}

let createNewCube = function(zDim, yDim, xDim) {
    let newSpace = [];
    for(let z = 0; z < zDim; z++) {
        newSpace.push(createNewPlane(yDim, xDim));
    }
    return newSpace;
}

let createNewPlane = function(yDim, xDim) {
    let newDim = [];
    for(let y = 0; y < yDim; y++) {
        newDim.push([]);
        for(let x = 0; x < xDim; x++) {
            newDim[y].push('.');
        }
    }
    return newDim;
}

let expandExistingSpace = function(space, yDim, xDim) {
    space.forEach(wi => {
        wi.unshift([]);
        wi.push([]);
        wi.forEach(zi => {
            if(zi.length > 0) {
                zi.unshift([]);
                zi.push([]);
            } else {
                for(let i = 0; i < yDim; i++) {
                    zi.push([]);
                }
            }
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
    })

}

let checkNeighbours = function(space, w, z, y, x) {
    let activeCount = 0;
    for(let wd = -1; wd <= 1; wd++) {
        for(let zd = -1; zd <= 1; zd++) {
            for(let yd = -1; yd <= 1; yd++) {
                for(let xd = -1; xd <= 1; xd++) {
                    if(!((w+wd) === w && (z+zd) === z && (y + yd) === y && (x + xd) === x)) {
                        if(space[w+wd][z+zd][y+yd][x+xd] === '#') {
                            activeCount++;
                        }
                    }
                }
            }
        }
    }

    if(space[w][z][y][x] === '#') {
        if (activeCount === 2 || activeCount === 3) {
            return '#';
        } else {
            return '.';
        }
    } else if (space[w][z][y][x] === '.') {
        if (activeCount === 3) {
            return '#';
        }
        else {
            return '.'
        }
    }
}

let step = function(space, wDim, zDim, yDim, xDim) {

    let newSpace = createNewSpace(wDim, zDim, yDim, zDim);

    for(let wi = 0; wi < wDim; wi++) {
        for(let zi = 0; zi < zDim; zi++) {
            for(let yi = 0; yi < yDim; yi++) {
                for(let xi = 0; xi< xDim; xi++) {
                    if(wi > 0 && zi > 0 && yi > 0 && xi > 0 && wi < wDim-1 && zi < zDim-1 && yi < yDim-1 && xi < xDim-1) {
                        newSpace[wi][zi][yi][xi] = checkNeighbours(space, wi, zi, yi, xi);
                    } else {
                        newSpace[wi][zi][yi][xi] = space[wi][zi][yi][xi];
                    }
                }
            }
        }
    }


    return newSpace;
}

console.log('starting')
printSpace(space);
expandExistingSpace(space, space[0][0].length+2, space[0][0][0].length+2);
printSpace(space);


let currentXDim = space[0][0][0].length;
let currentYDim = space[0][0].length;
let currentZDim = space[0].length;

space.unshift(createNewCube(currentZDim, currentYDim, currentXDim));
space.push(createNewCube(currentZDim, currentYDim, currentXDim));

let currentWDim = space.length;

printSpace(space);


for(let cycle = 0; cycle < 6; cycle++) {
    expandExistingSpace(space, space[0][0].length+2, space[0][0][0].length+2);
    printSpace(space);
    let currentXDim = space[0][0][0].length;
    let currentYDim = space[0][0].length;
    let currentZDim = space[0].length;
    space.unshift(createNewCube(currentZDim, currentYDim, currentXDim));
    space.push(createNewCube(currentZDim, currentYDim, currentXDim));
    currentWDim = space.length;
    printSpace(space);
    // here is where we check neighbours for the cycle
    space = step(space, currentWDim, currentZDim, currentYDim, currentXDim);
    console.log('calculated neighbours')
    printSpace(space);    
}

let total = 0;
space.forEach(wi => {
    wi.forEach(zi => {
        zi.forEach(yi => {
            yi.forEach(xi => {
                if(xi === '#') {
                    total += 1;
                }
            });
        });
    })
});
console.log(total);
