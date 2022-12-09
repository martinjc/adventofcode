const fs = require('fs');

let input = fs.readFileSync('input', 'utf-8').split('\n');

class Position {
    x = 0;
    y = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    moveUp() {
        this.y++;
    }

    moveDown() {
        this.y--;
    }

    moveRight() {
        this.x++;
    }

    moveLeft() {
        this.x--;
    }

    asString() {
        return `${this.x},${this.y}`;
    }

    isNeighbour(pos) {
        let xPos = [this.x, pos.x].sort((a, b) => b - a);
        let yPos = [this.y, pos.y].sort((a, b) => b - a);
        let xDiff = xPos[0] - xPos[1];
        let yDiff = yPos[0] - yPos[1];
        return (xDiff < 2) && (yDiff < 2)
    }

}


let knots = [new Position(0, 0)]
for (i = 0; i < 9; i++) {
    knots.push(new Position(0, 0));
}

let tPositions = new Set();
tPositions.add(knots[9].asString());

console.log(tPositions);

for (line of input) {
    console.log(line);
    let tokens = line.split(' ');
    let direction = tokens[0];
    let magnitude = +tokens[1];
    //console.log(direction, magnitude);
    for (let i = 0; i < magnitude; i++) {
        switch (direction) {
            case 'R':
                knots[0].moveRight();
                break;
            case 'U':
                knots[0].moveUp();
                break;
            case 'L':
                knots[0].moveLeft();
                break;
            case 'D':
                knots[0].moveDown();
                break;
        }
        //console.log('precheck',knots);
        for (let i = 1; i <= 9; i++) {
            if (!knots[i].isNeighbour(knots[i-1])) {
                if (knots[i].y === knots[i-1].y && knots[i].x !== knots[i-1].x) {
                    if (knots[i].x < knots[i-1].x) {
                        knots[i].moveRight();
                    } else {
                        knots[i].moveLeft();
                    }
                } else if (knots[i].x === knots[i-1].x && knots[i].y !== knots[i-1].y) {
                    if (knots[i].y < knots[i-1].y) {
                        knots[i].moveUp();
                    } else {
                        knots[i].moveDown();
                    }
                } else if (knots[i].x !== knots[i-1].x && knots[i].y !== knots[i-1].y) {
                    if (knots[i-1].x > knots[i].x && knots[i-1].y > knots[i].y) {
                        knots[i].moveRight();
                        knots[i].moveUp();
                    } else if (knots[i-1].x > knots[i].x && knots[i-1].y < knots[i].y) {
                        knots[i].moveRight();
                        knots[i].moveDown();
                    } else if (knots[i-1].x < knots[i].x && knots[i-1].y > knots[i].y) {
                        knots[i].moveLeft();
                        knots[i].moveUp();
                    } else if (knots[i-1].x < knots[i].x && knots[i-1].y < knots[i].y) {
                        knots[i].moveLeft();
                        knots[i].moveDown();
                    }
                }
            }
        }
        //console.log('postcheck',knots);
        tPositions.add(knots[9].asString());
    }
}

console.log(tPositions.size);

