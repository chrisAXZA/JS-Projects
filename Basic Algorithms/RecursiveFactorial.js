// Big O(n), as n increases the number of executions increases at
// the same pace

// factorial of a non-negative integer n!, is the product of all
// positive integers less than or equal to n (factorial of zero is 1)
function recursiveFactorial(n) {
    // n! = n * (n-1)! => recursion logic
    if (n === 0) {
        return 1;
    }

    return n * recursiveFactorial(n - 1);
}

console.log(recursiveFactorial(0));
console.log(recursiveFactorial(1));
console.log(recursiveFactorial(5));