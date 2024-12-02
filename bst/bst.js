class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree([...new Set(array)].sort((a, b) => a - b));
    }

    buildTree(array) {
        if (array.length === 0) return null;

        let mid = Math.floor(array.length / 2)
        let root = new Node(array[mid]);

        let left = array.slice(0, mid)
        let right = array.slice(mid + 1);

        root.left = this.buildTree(left);
        root.right = this.buildTree(right);

        return root;
    }

    insert(value) {
        let current = this.root

        while (current.data !== null) {
            if (current.data === value) throw Error("Value already exists in the tree")
            if (current.data < value) {
                if (current.right === null) return current.right = new Node(value);
                current = current.right;
            }
            if (current.data > value) {
                if (current.left === null) return current.left = new Node(value);
                current = current.left;
            }
        }
        return;
    }

    deleteItem(value) {
        // if we remove a Node with two children, you have to find the closest value(1 step right, then until the very left)
        // if only one child, replace the value with its child's (the whole Node)

    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

const testTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
testTree.insert(25)


prettyPrint(testTree.root);