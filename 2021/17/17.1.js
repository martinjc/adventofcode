let input = `target area: x=144..178, y=-100..-76`;
//let input = `target area: x=20..30, y=-10..-5`;

let xCoords = input.substring(input.indexOf('x=') + 2, input.indexOf(', ')).split('..').map(n => +n);
console.log(xCoords);
let yCoords = input.substring(input.indexOf('y=') + 2, input.length).split('..').map(n => +n);
console.log(yCoords);

let validVelocities = [];

function checkPosition(x, y) {
    return (x >= xCoords[0] && x <= xCoords[1] && y >= yCoords[0] && y <= yCoords[1]);
}

function checkPastTarget(x, y) {
    return (x > xCoords[1] && (yCoords[1] < 0 ? y < yCoords[1] : y > yCoords[1]));
}


function testVelocities(startXVel, startYVel) {
    let x = 0;
    let y = 0;

    let xPositions = [];
    let yPositions = [];

    let xVelocity = startXVel;
    let yVelocity = startYVel;

    for (let step = 0; step < 600; step++) {
        x += xVelocity;
        y += yVelocity;

        xPositions.push(x);
        yPositions.push(y);

        if (xVelocity > 0) {
            xVelocity--;
        } else if (xVelocity < 0) {
            xVelocity++;
        }
        yVelocity--;

        let inTarget = checkPosition(x, y);
        if (inTarget) {
            validVelocities.push(
                { xVel: startXVel, yVel: startYVel, xPos: xPositions, yPos: yPositions }
            );
            break;
        }
        // if (checkPastTarget(x, y)) {
        //     break;
        // }
    }
}

for (let x = 0; x < 200; x++) {
    for (let y = 200; y > -200; y--) {
        testVelocities(x, y);
    }
}

let maxes = validVelocities.map(v => {
    return { x: v.xVel, y: v.yVel, max: Math.max(...v.yPos) }
});
console.log(maxes);
maxY = Math.max(...maxes.map(m => m.max));
console.log(maxY);
console.log(maxes.filter(m => m.max === maxY));
console.log(validVelocities.length);



