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
        return ((Math.abs(pos.x - this.x) < 2) && (Math.abs(pos.y - this.y) < 2))
    }

}


let H = new Position(0, 0);
let T = new Position(0, 0);
let tPositions = new Set();
tPositions.add(T.asString());

console.log(tPositions);

for (line of input) {
    //console.log(line);
    let tokens = line.split(' ');
    let direction = tokens[0];
    let magnitude = +tokens[1];
    //console.log(direction, magnitude);
    for (let i = 0; i < magnitude; i++) {
        switch (direction) {
            case 'R':
                H.moveRight();
                break;
            case 'U':
                H.moveUp();
                break;
            case 'L':
                H.moveLeft();
                break;
            case 'D':
                H.moveDown();
                break;
        }
        //console.log('precheck',H, T);
        if (!T.isNeighbour(H)) {
            if (T.y === H.y && T.x !== H.x) {
                if (T.x < H.x) {
                    T.moveRight();
                } else {
                    T.moveLeft();
                }
            } else if (T.x === H.x && T.y !== H.y) {
                if (T.y < H.y) {
                    T.moveUp();
                } else {
                    T.moveDown();
                }
            } else if (T.x !== H.x && T.y !== H.y) {
                if (H.x > T.x && H.y > T.y) {
                    T.moveRight();
                    T.moveUp();
                } else if (H.x > T.x && H.y < T.y) {
                    T.moveRight();
                    T.moveDown();
                } else if (H.x < T.x && H.y > T.y) {
                    T.moveLeft();
                    T.moveUp();
                } else if (H.x < T.x && H.y < T.y) {
                    T.moveLeft();
                    T.moveDown();
                }
            }
        }
        //console.log('postcheck',H, T);
        tPositions.add(T.asString());
    }
}

console.log(tPositions.size);

