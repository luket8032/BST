const Node = (data, left = null, right = null) => {
    return { data, left, right };
  };

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
        }

        if (root.data > data) {
            return find(root.left, data)
        } else if (root.data < data) {
            return find(root.right, data)
        }
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

    return { prettyPrint, insert, deleteNode, find, bst };
}

const test = [40, 100, 1, 5, 25, 10];

const testTree = Tree(test);
console.log(testTree.find(testTree.bst, 10))

// console.log(testTree.prettyPrint(testTree.bst));