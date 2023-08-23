const Node =  require('./node.js');

const Tree = (inputArr) => {
    let bst = null;

    const sortArr = (arr) => {
        let sorted = [...new Set(arr.sort(function(a, b){return a-b}))];
        return sorted;
    };

    const buildTree = (arr, start, end) => {
        const sortedArr = sortArr(arr);
        if(start > end) return null;
        const mid = parseInt((start + end) / 2);
        const root = Node(sortedArr[mid]);
        root.left = buildTree(sortedArr, start, mid - 1);
        root.right = buildTree(sortedArr, mid + 1, end)
        return root;
    };

    const insert = (data) => {
        bst = insertRec(bst, data);
    } ;

    const insertRec = (root, data) => {
        if(root === null) {
            return Node(data);
        }
        
        if(data < root.data) {
            root.left = insertRec(root.left, data);
        } else if (data > root.data) {
            root.right = insertRec(root.right, data);
        }

        return root;
    };

    const deleteNode = (data) => {
        bst = deleteRec(bst, data);
    };

    const deleteRec = (root, data) => {
        if(root.data === null) {
            return root;
        }

        if(root.data > data) {
            root.left = deleteRec(root.left, data);
            return root;
        } else if (root.data < data) {
            root.right = deleteRec(root.right, data);
            return root;
        }

        if (root.left === null) {
            let temp = root.right;
            root = null;
            return temp;
        } else if (root.right === null) {
            let temp = root.left;
            root = null;
            return temp;
        } else if (root.right != null && root.left != null) {
            let succParent = root;
            let succ = root.right;
            while (succ.left !== null) {
                succParent = succ;
                succ = succ.left;
            }

            if (succParent !== root) {
                succParent.left = succ.right;
            } else {
                succParent.right = succ.right;
            }

            root.data = succ.data;
            succ = null;
            return root;
        }
    };

    const find = (root, data) => {
        if (root.data === data) {
            return root;
        } else if (!root.left || !root.right) {
            return "Node does not exist.";
        }

        if (root.data > data) {
            return find(root.left, data);
        } else if (root.data < data) {
            return find(root.right, data);
        }
    };

    const levelOrder = () => {
        let queue = [], visited = [], current = bst;
        queue.push(current);

        while (queue.length) {
            current = queue.shift();
            visited.push(current.data);

            if (current.left) {
                queue.push(current.left);
            }

            if (current.right) {
                queue.push(current.right);
            }
        }

        return visited
    };

    const preOrder = () => {
        let visited = [], current = bst;

        const traverse = (node) => {
            visited.push(node.data);
            if(node.left) { traverse(node.left); }
            if(node.right) { traverse(node.right); }
        };

        traverse(current);
        return visited;
    };

    const postOrder = () => {
        let visited = [], current = bst;

        const traverse = (node) => {
            if(node.left) { traverse(node.left); }
            if(node.right) { traverse(node.right); }
            visited.push(node.data);
        };

        traverse(current);
        return visited;
    };

    const inOrder = () => {
        let visited = [], current = bst;

        const traverse = (node) => {
            if(node.left) { traverse(node.left) }
            visited.push(node.data);
            if(node.right) { traverse(node.right) }
        };

        traverse(current);
        return visited;
    };

    const height = (node) => {
        if (node === null) {
            return 0;
        } else {
            let lHeight = height(node.left);
            let rHeight = height(node.right);

            if (lHeight > rHeight) return lHeight + 1;
            else return rHeight + 1;
        }
    };

    const depth = (node, targetNodeVal) => {
        if (node === null) return -1;

        let dist = -1;

        if((node.data === targetNodeVal) || (dist = depth(node.left, targetNodeVal) >= 0) || (dist = depth(node.right, targetNodeVal)) >= 0) {
            return dist + 1;
        }
        return dist;
    };

    const isBalanced = () => {
        if(bst === null) return "There is nothing";
        const lHeight = height(bst.left);
        const rHeight = height(bst.right);
        
        const diff = Math.abs(lHeight - rHeight);

        if (diff <= 1) return "Balanced";
        else return "Not balanced";
    };

    const reBalance = () => {
        const reBalanceArr = inOrder(bst);
        bst = buildTree(reBalanceArr, 0, reBalanceArr.length - 1);
    };

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

    bst = buildTree(inputArr, 0, inputArr.length - 1);

    return { 
        prettyPrint,
        insert,
        deleteNode,
        find,
        levelOrder,
        preOrder,
        postOrder,
        inOrder,
        height,
        depth,
        isBalanced,
        reBalance,
        bst
    };
}

module.exports = Tree;

// TESTS
// const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// const testTree = Tree(testArr);

// testTree.prettyPrint(testTree.bst);