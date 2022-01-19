class Pair {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.parent = null;
    }

    get depth() {
        return this.parent === null ? 0 : this.parent.depth + 1;
    }

    get root() {
        return this.parent ? this.parent.root : this;
    }

    toString() {
        if (this.left && this.right) {
            return `[${this.left.toString()},${this.right.toString()}]`;
        } else {
            return this.value;
        }
    }


}


// let input = `[1,2]
// [[1,2],3]
// [9,[8,7]]
// [[1,9],[8,5]]
// [[[[1,2],[3,4]],[[5,6],[7,8]]],9]
// [[[9,[3,8]],[[0,9],6]],[[[3,7],[4,9]],3]]
// [[[[1,3],[5,3]],[[1,3],[8,7]]],[[[4,9],[6,9]],[[8,2],[7,3]]]]`;

let input = `[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]`;

let rows = input.split(/\r?\n/);
rows.forEach(r => {
    p = parseInput(r);
    console.log(p.toString());
    console.log(p.depth);
    checkDepth(p);
});

function parseInput(r) {
    let number = JSON.parse(r);
    console.log(number);
    return buildNumber(number);
}

function buildNumber(number) {
    let a = new Pair();
    if (Array.isArray(number[0])) {
        leftChild = buildNumber(number[0]);
    } else {
        leftChild = new Pair(+number[0]);
    }
    a.left = leftChild;
    leftChild.parent = a;
    if (Array.isArray(number[1])) {
        rightChild = buildNumber(number[1]);
    } else {
        rightChild = new Pair(+number[1]);
    }
    a.right = rightChild;
    rightChild.parent = a;
    return a;
}

function add(a, b) {
    p = new Pair();
    p.left = a;
    p.right = b;
    a.parent = p;
    b.parent = p;
}

function explode(node) {
    console.log('exploding', node.toString());
    leftValue = node.left.value;
    rightValue = node.right.value;

    replacedRight = false;
    replacedLeft = false;

    let left = node.parent;
    leftSearching = true;
    while (leftSearching) {
        if (left.left.value) {
            left.left.value += leftValue;
            replacedLeft = true;
            leftSearching = false;
        } else {
            if (left.parent) {
                left = left.parent;
            } else {
                leftSearching = false;
            }
        }
    }

    let right = node.parent;
    rightSearching = true;
    while (rightSearching) {
        if (right.right.value) {
            right.right.value += rightValue;
            replacedRight = true;
            rightSearching = false;
        } else {
            if (right.parent) {
                right = right.parent;
            } else {
                rightSearching = false;
            }
        }
    }
    if (replacedLeft) {
        left.right = new Pair(0);
    }
    if (replacedRight) {
        right.left = new Pair(0);
    }
    console.log('exploded', node.root.toString());
}

function checkDepth(tree) {
    if (tree.depth >= 4 && tree.left && tree.right) {
        console.log('tree is deep', tree.toString());
        explode(tree);
    } else {
        if (tree.left) {
            checkDepth(tree.left);
        }
        if (tree.right) {
            checkDepth(tree.right);
        }
    }

}
