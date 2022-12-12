const fs = require('fs');
const { isGeneratorFunction } = require('util/types');

let input = fs.readFileSync('input', 'utf-8').split('\n')
input = input.map(i => i.split(''));

const width = input[0].length;
const height = input.length;

console.log(width, height);

const alphabet = 'abcdefghijklmnopqrstuvwxyz';

class Node {
    constructor(i, j, letter) {
        this.i = i;
        this.j = j;
        this.letter = letter
        this.visited = false;
        this.weight = Infinity;
    }

    getNeighbours() {
        let neighbours = [];
        // left neighbour (i-1, j) 
        if(this.i > 0) {
            neighbours.push([this.i-1, this.j]);
        }
        // right neighbour (i+1, j)
        if(this.i < height-1) {
            neighbours.push([this.i+1, this.j]);
        }
        // up neighbour (i, j-1)
        if (this.j > 0) {
            neighbours.push([this.i, this.j-1]);
        }
        // down neighbour (i, j+1)
        if(this.j < width-1) {
            neighbours.push([this.i, this.j+1]);
        }
        return neighbours;
    }
}

let nodes = [];
let start, end;

for(let j = 0; j < input[0].length; j++) {
    for(let i =0; i < input.length; i++) {
        let node = new Node(i, j, input[i][j])
        if(node.letter === 'S') {
            start = node;
        }
        if(node.letter === 'E') {
            end = node;
            end.letter = 'z';
        }
        nodes.push(node);
    }
}

//console.log(nodes);
console.log(start);
console.log(end);

start.weight = 0;
let neighbours = start.getNeighbours();
for(let n of neighbours) {
    nNode = nodes.find(a => a.i === n[0] && a.j === n[1]);
    nNode.weight = 1; 
}

while(end.visited === false) {
    
    minWeight = Infinity;
    nextNode = undefined;
    let candidates = nodes.filter(n => (n.visited === false) && (n.weight !== Infinity));
    for(let o of candidates) {
        if(o.weight < minWeight) {
            minWeight = o.weight;
            nextNode = o;
        }
    }
    console.log('nextNode', nextNode);

    let c = nextNode;
    let neighbours = c.getNeighbours();
    for(let nidx of neighbours) {
        n = nodes.find(a => a.i === nidx[0] && a.j === nidx[1]);
        if(n.visited === false) {
            if((alphabet.indexOf(n.letter) - alphabet.indexOf(c.letter) === 1) || (alphabet.indexOf(n.letter) < alphabet.indexOf(c.letter)) || (n.letter === c.letter)) {
                if(n.weight > c.weight + 1) {
                    n.weight = c.weight + 1;
                }
            }
        }
    }
    c.visited = true;
} 

console.log(end.weight);


