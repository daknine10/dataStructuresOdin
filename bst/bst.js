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

        if (root.data === value) throw Error(`Value ${value} already exists in the tree`)

        if (value < root.data) root.left = this.insert(value, root.left)
        else if (value > root.data) root.right = this.insert(value, root.right)

        return root;
    }

    deleteItem(value, root = this.root) {
    if (root === null) {
        return root;
    }

    if (root.data > value) {
        root.left = this.deleteItem(value, root.left);
    } 
    else if (root.data < value) {
        root.right = this.deleteItem(value, root.right);
    } 
    else {
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;

        let closest = root.right;
        while (closest.left !== null) {
            closest = closest.left
        }
        root.data = closest.data;
        root.right = this.deleteItem(closest.data, root.right)
    }
    return root;
    }

    find(value, root = this.root) {
        if (root === null) return root
        if (root.data === value) return root

        if (value < root.data) return this.find(value, root.left)
        else if (value > root.data) return this.find(value, root.right)

        return root;
    }

    levelOrder(callback, root = this.root) {
        if (!callback || typeof callback !== "function") {
            throw new Error("This function accepts only callback functions as a parameter!");
        }
    
        const q = [];
        if (root !== null) {
            q.push(root);
        }
    
        while (q.length > 0) {
            const node = q.shift();
            callback(node);
    
            if (node.left !== null) {
                q.push(node.left);
            }
            if (node.right !== null) {
                q.push(node.right);
            }
        }
    }

    inOrder(callback, root = this.root) {
        if (!callback || typeof callback !== "function") {
            throw new Error("This function accepts only callback functions as a parameter!");
        }

        if (root === null) return;

        this.inOrder(callback, root.left);
        callback(root);
        this.inOrder(callback, root.right); 
    }

    preOrder(callback, root = this.root) {
        if (!callback || typeof callback !== "function") {
            throw new Error("This function accepts only callback functions as a parameter!");
        }

        if (root === null) return;

        callback(root);
        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right); 
    }

    postOrder(callback, root = this.root) {
        if (!callback || typeof callback !== "function") {
            throw new Error("This function accepts only callback functions as a parameter!");
        }

        if (root === null) return;

        this.preOrder(callback, root.left);
        this.preOrder(callback, root.right); 
        callback(root);
    }

    height(node, root = this.root) {
        if (root === null) return 0;
        
        const leftHeight = this.height(node, root.left);
        const rightHeight = this.height(node, root.right);
    
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, root = this.root, depth = 0) {
        if (root === null) return -1;
        if (root.data === node) return depth;

        if (root.data > node) {
            return this.depth(node, root.left, depth + 1);
        } 
        else if (root.data < node) {
            return this.depth(node, root.right, depth + 1);
        } 
    }

    isBalanced(root = this.root) {
        if (root === null) return true;
        
        const leftHeight = this.height(root.left, root.left);
        const rightHeight = this.height(root.right, root.right);

        return Math.abs(leftHeight - rightHeight) <= 1  && this.isBalanced(root.left, root.left) && this.isBalanced(root.right)
    }

    rebalance() {
        let nodes = [];
        this.inOrder((node) => nodes.push(node.data))

        this.root = this.buildTree(nodes);
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
testTree.deleteItem(67)
testTree.deleteItem(324)
testTree.deleteItem(5)
testTree.deleteItem(7)
testTree.find(23)

testTree.insert(65)
testTree.insert(26)
testTree.insert(27)
testTree.insert(28)
testTree.insert(29)
testTree.insert(30)
testTree.insert(31)
testTree.insert(39)
testTree.insert(33)

console.log(testTree.isBalanced())
testTree.rebalance()
console.log(testTree.isBalanced())


prettyPrint(testTree.root);
