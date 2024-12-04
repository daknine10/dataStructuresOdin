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

    insert(value, root = this.root) {
        if (root === null) return new Node(value);

        if (root.data === value) throw Error("Value already exists in the tree")

        if (value < root.data) root.left = insert(value, root.left)
        else if (value > root.data) root.right = insert(value, root.right)

        return root;
    }

    deleteItem(value, root = this.root) {
    if (root === null) {
        return root;
    }

    if (root.data > value) {
        root.left = deleteItem(value, root.left);
    } else if (root.data < value) {
        root.right = deleteItem(value, root.right;
    } else {

        if (root.left === null) 
            return root.right;

        if (root.right === null) 
            return root.left;

        let closest = root.right;
        while (closest.left !== null) {
            closest = closest.left
        }
        root.value = closest.value;
        root.right = deleteItem(root.right, closest.value)
    }
    return root;
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
