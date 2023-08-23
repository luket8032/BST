const Tree = require('./bst.js');

// Fn to generate array of random numbers < 100.
const randomArray = (arrLength) => {
    const uniqueNums = new Set();

    while(uniqueNums.size < arrLength) {
        uniqueNums.add(Math.floor(Math.random() * 100));
    }
    
    return Array.from(uniqueNums);
};

//DRIVER SCRIPTS

const testArr = randomArray(10); // generate array of 10 random numbers

const testTree = Tree(testArr); // create Tree from generated array

console.log(testTree.prettyPrint(testTree.bst)); // print tree in console

console.log(testTree.isBalanced()); // is Tree balanced?

// Print Nodes in different traversal orders
console.log('Level Order: ',testTree.levelOrder());
console.log('Pre Order: ',testTree.preOrder());
console.log('Post Order: ',testTree.postOrder());
console.log('In Order: ',testTree.inOrder());

// Unbalancing the tree
testTree.insert(321)
testTree.insert(434)
testTree.insert(123)
testTree.insert(154)

console.log(testTree.isBalanced()); // is Tree balanced?

// Rebalancing the tree
testTree.reBalance();
console.log(testTree.isBalanced()); // is Tree balanced?

// Print rebalanced Nodes in different traversal orders
console.log('Level Order: ',testTree.levelOrder());
console.log('Pre Order: ',testTree.preOrder());
console.log('Post Order: ',testTree.postOrder());
console.log('In Order: ',testTree.inOrder());




