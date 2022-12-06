// Big O = O(n), linear - as the size of the array increases,
// the number of operations increases accordingly

function linearSearch(arr, target) {
    // given an array of n elements and a target element t, fint the index
    // of t in the array. Return -1 if the target element is not found

    for (i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }

    return -1;
}

console.log(linearSearch([-5, 2, 10, 4, 6], 10));
console.log(linearSearch([-5, 2, 10, 4, 6], 6));
console.log(linearSearch([-5, 2, 10, 4, 6], 20));