const fs = require('fs');
const { isUndefined, inspect } = require('util');

let input = fs.readFileSync('input', 'utf-8').split('\n');

class Monkey {
    items = [];
    count = 0;
    operation = undefined;
    testValue = undefined;
    trueMonkey = undefined;
    falseMonkey = undefined;
    modulo = undefined;
    constructor(items, operation, testValue, trueMonkey, falseMonkey) {
        this.items = items;
        this.operation = operation;
        this.testValue = testValue;
        this.trueMonkey = trueMonkey;
        this.falseMonkey = falseMonkey;
    }

    getItem() {
        return this.items.shift();
    }

    receiveItem(item) {
        this.items.push(item);
    }

    testItem(item) {
        return (item % this.testValue) === 0 ? this.trueMonkey : this.falseMonkey;
    }

    inspectItem(item) {
        this.count++;
        item = this.operation(item);
        item = item % this.modulo;
        this.operation;
        return item;
    }
}

let m0 = new Monkey([63, 84, 80, 83, 84, 53, 88, 72], i => i * 11, 13, 4, 7);
let m1 = new Monkey([67, 56, 92, 88, 84], i => i + 4, 11, 5, 3);
let m2 = new Monkey([52], i => i * i, 2, 3, 1);
let m3 = new Monkey([59, 53, 60, 92, 69, 72], i => i + 2, 5, 5, 6);
let m4 = new Monkey([61, 52, 55, 61], i => i + 3, 7, 7, 2);
let m5 = new Monkey([79, 53], i => i+1, 3, 0, 6);
let m6 = new Monkey([59, 86, 67, 95, 92, 77, 91], i => i+5, 19, 4, 0);
let m7 = new Monkey([58, 83, 89], i => i * 19, 17, 2, 1);


let monkeys = [m0, m1, m2, m3, m4, m5, m6, m7];

let tests = monkeys.map(m => m.testValue);
let modValue = tests.reduce((a, b) => a * b);
monkeys.forEach(m => m.modulo = modValue);

for(let round = 0; round < 10000; round++) {
    for(monkey of monkeys) {
        let numItems = monkey.items.length;
        for(let i = 0; i < numItems; i++) {
            item = monkey.getItem();
            item = monkey.inspectItem(item);
            newMonkey = monkey.testItem(item);
            monkeys[newMonkey].receiveItem(item);
        }
    }
}
let inspectionCount = [];
for(monkey of monkeys) {
    inspectionCount.push(monkey.count);
}
inspectionCount.sort((a, b) => b-a);
console.log(inspectionCount);
console.log(inspectionCount[0] * inspectionCount[1]);