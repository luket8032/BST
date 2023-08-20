const Node = (data, left = null, right = null) => {
    return { data, left, right };
  };

const Tree = (inputArr) => {
    const sortArr = (arr) => {
        let sorted = [...new Set(arr.sort(function(a, b){return a-b}))];
        return sorted
    }

    const buildTree = (arr, start, end) => {
        const sortedArr = sortArr(arr);
        if(start > end) return null;
        const mid = parseInt((start + end) / 2);
        const root = Node(sortedArr[mid]);
        root.left = buildTree(sortedArr, start, mid - 1);
        root.right = buildTree(sortedArr, mid + 1, end)
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

    const bst = prettyPrint(buildTree(inputArr, 0, inputArr.length - 1));

    return { prettyPrint, bst }
}

const test = [40, 100, 1, 5, 25, 10];

const testTree = Tree(test);

console.log(testTree.bst);