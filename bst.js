const Node = (data, left = null, right = null) => {
    return {data, left, right}
}

const Tree = (inputArr) => {
    const sortArr = (arr) => {
        let sorted = [...new Set(arr.sort(function(a, b){return a-b}))];
        return sorted
    }

    const buildTree = (arr, start, end) => {
        const sortedArr = sortArr(arr);
        if(start > end) return null;
        const mid = (start + end) / 2;
        const root = new Node(sortedArr[mid]);
        root.left = buildTree(sortedArr, 0, mid - 1);
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

    return { buildTree, prettyPrint }
}
