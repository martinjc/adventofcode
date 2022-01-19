const fs = require('fs');

let tiles = [];

function arrayMatches(a, b) {
    return a.every((ai, i) => ai === b[i]);
}

function Tile(id, data) {
    this.id = id;
    this.data = data;

    this.west = this.data.map(tt => tt[0]).reverse();
    this.east = this.data.map(tt => tt[tt.length-1]);
    this.north = this.data[0];
    this.south = this.data[this.data.length - 1].reverse();

    this.getEdges = function () {
        return [this.north, this.south, this.east, this.west];
    }

    this.print = function () {
        console.log(this.id);
        console.log('north', this.north);
        console.log('south', this.south);
        console.log('east', this.east);
        console.log('west', this.west);
    }

    this.rotate = function() {
        let t = this.south;
        this.south = this.west;
        this.west = this.north;
        this.north = this.east;
        this.east = t;
    }

    this.flipNS = function () {
        let t = this.south;
        this.south = this.north;
        this.north = t;
        t = this.east[0];
        this.east[0] = this.east[this.east.length - 1];
        this.east[this.east.length - 1] = t;
        t = this.west[0];
        this.west[0] = this.west[this.west.length - 1];
        this.west[this.west.length - 1] = t;
    }

    this.flipEW = function () {
        let t = this.east;
        this.east = this.west;
        this.west = t;
        t = this.south[0];
        this.south[0] = this.south[this.south.length - 1];
        this.south[this.south.length - 1] = t;
        t = this.north[0];
        this.north[0] = this.north[this.north.length - 1];
        this.north[this.north.length - 1] = t;
    }

    this.numMatches = function(edges) {
        let count = 0;
        // console.table(this.north);
        // console.table(this.south);
        // console.table(this.east);
        // console.table(this.west);
        // console.log('###### edges')
        for (e of edges) {
            // console.table(e);
            if (arrayMatches(e, this.north) || arrayMatches(e, this.south) || arrayMatches(e, this.east) || arrayMatches(e, this.west)) {
                // console.log(e);
                // console.log(this.north);
                // console.log(this.south);
                // console.log(this.east);
                // console.log(this.west);
                count++;
            }
        };
        return count;
    }
}

fs.readFile('input', 'utf-8', (err, data) => {
    let lines = data.split(/\r?\n/);
    let tile = {
        data: []
    };
    lines.forEach(l => {

        if(l.startsWith('Tile')) {
            tile['id'] = l.replace('Tile ', '').replace(':', '');
        } else if(l === '') {
            tiles.push(new Tile(tile.id, tile.data));
            tile = {
                data: []
            };
        } else {
            tile.data.push(l.split(''));
        }

    });
    tiles.push(new Tile(tile.id, tile.data));

    tiles.forEach(tI => {
        let maxMatch = 0;
        tiles.forEach(tJ => {
            if (tI.id !== tJ.id) {
                let numMatches = tI.numMatches(tJ.getEdges());
                if (numMatches > maxMatch) {
                    maxMatch = numMatches;
                }
                for (let i = 0; i < 3; i++) {
                    tJ.rotate();
                    numMatches = tI.numMatches(tJ.getEdges());
                    if (numMatches > maxMatch) {
                        maxMatch = numMatches;
                    }
                }
                tJ.flipNS();
                numMatches = tI.numMatches(tJ.getEdges());
                if (numMatches > maxMatch) {
                    maxMatch = numMatches;
                }
                tJ.flipEW();
                numMatches = tI.numMatches(tJ.getEdges());
                if (numMatches > maxMatch) {
                    maxMatch = numMatches;
                }
            }
        });
        console.log(tI.id, maxMatch);
    });
})