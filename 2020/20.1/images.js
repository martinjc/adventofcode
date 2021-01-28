const fs = require('fs');

let tiles = [];


let arrayMatch = function(a, b) {
    return a.every((ai, i) => {
        return ai === b[i];
    })
}

function Tile(id) {
    this.id = id;
    this.tiles = [];

    this.rotate = function() {
        let rotated_tiles = [];
        this.tiles.forEach((t, i) => {
            t.forEach((r, j) => {
                
            }
        })
    }
}




fs.readFile('input', 'utf-8', (err, data) => {
    lines = data.split(/\r?\n/);
    let tile = {
        tiles: []
    };
    lines.forEach(l => {

        if(l.startsWith('Tile')) {
            tile['id'] = l.replace('Tile ', '').replace(':', '');
        } else if(l === '') {
            tiles.push(tile);
            tile = {
                tiles: []
            };
        } else {
            tile.tiles.push(l.split(''));
        }

    });
    tiles.push(tile);
    console.log(tiles);

    tiles.forEach(t => {

        t.left = t.tiles.map(tt => {
            return tt[0];
        });
        t.right = t.tiles.map(tt => {
            return tt[tt.length-1];
        });
        t.top = t.tiles[0];
        t.bottom = t.tiles[t.tiles.length-1];



        tiles.filter(p => {
            if(edgesMatch(t, p)) {
                return p.id;
            }
        })
    });
})