// Big O = O(logn), n refers to the size of the array, the number of 
// instructions increases as the size of n grows, but not at
// the same rate as n

function binarySearch(arr, target) {
    // BinarySearch only works on a sorted array
    // If the array is empty, return -1 as the element cannot be found
    // If the array has elements, find the middle element in the array. If 
    // target is equal to the middle element, return the middle element
    // index.
    // If target is less than the middle element, binary search 
    // left half of the array. If target is greater than middle element,
    // binary search right half of the array.

    let leftIndex = 0;
    let rightIndex = arr.length - 1;

    while (leftIndex <= rightIndex) {
        let middleIndex = Math.floor((leftIndex + rightIndex) / 2);
        let middleElement = arr[middleIndex];

        if (target === middleElement) {
            return middleIndex;
        }

        if (target < middleElement) {
            rightIndex = middleIndex - 1;
        } else {
            leftIndex = middleIndex + 1;
        }
    }

    return -1;
}

console.log(binarySearch([-5, 2, 4, 6, 10], 10));
console.log(binarySearch([-5, 2, 4, 6, 10], 6));
console.log(binarySearch([-5, 2, 4, 6, 10], 20));