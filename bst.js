const Node = (data, left = null, right = null) => {
    return {data, left, right}
}

const Tree = (inputArr) => {
    const sortArr = (arr) => {
        let sorted = new Set(arr);
    }

    const buildTree = (arr, start, end) => {
        if(start > end) return null;
    }

    return { buildTree }
}

const sortArr = (arr) => {
    let sorted = [...new Set(arr)];
    sorted = sorted.sort(function(a, b){return a-b});
    return sorted
}

const test = [40, 100, 1, 5, 4, 4, 25, 10]

console.log(sortArr(test));