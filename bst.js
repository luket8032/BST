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
    } 

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
    }

    const deleteRec = (root, data) => {
        if(root.data === null) {
            return root;
        }

        if(root.data > data) {
            deleteRec(root.left, data);
        } else if (root.data < data) {
            deleteRec(root.right, data);
        }

        if (root.left === null) {
            let temp = root.right;
            delete root;
            return temp;
        } else if (root.right === null) {
            let temp = root.left;
            delete root;
            return temp;
        }

        else {
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

            root.key = succ.key;

            delete succ;
            return root;
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

    bst = buildTree(inputArr, 0, inputArr.length - 1);

    return { prettyPrint, insert, deleteNode, bst };
}

const test = [40, 100, 1, 5, 25, 10];

const testTree = Tree(test);

testTree.insert(40);
testTree.insert(50);
testTree.insert(60);
testTree.insert(110);

testTree.deleteNode(100);

console.log(testTree.prettyPrint(testTree.bst));