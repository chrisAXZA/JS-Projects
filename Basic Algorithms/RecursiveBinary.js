// Big O = O(logn), even though lacking loops search function is called repeatedly
// however input size reduces by halve for each iteration

function recursiveBinary(arr, target) {
    return search(arr, target, 0, arr.length - 1);
}

function search(arr, target, leftIndex, rightIndex) {
    // no more elements left in the array to work with
    if (leftIndex > rightIndex) {
        return -1; // element was not found in the array
    }

    const middleIndex = Math.ceil((leftIndex + rightIndex) / 2);
    const middleElement = arr[middleIndex];

    if (target === middleElement) {
        return middleIndex;
    }

    if (target < middleElement) {
        // target is located in the left halve of the array
        return search(arr, target, leftIndex, middleIndex - 1);
    } else {
        // target is located in the right halve of the array
        return search(arr, target, middleIndex + 1, rightIndex);
    }
}

console.log(recursiveBinary([-5, 2, 4, 6, 10], 10));
console.log(recursiveBinary([-5, 2, 4, 6, 10], 6));
console.log(recursiveBinary([-5, 2, 4, 6, 10], 20));