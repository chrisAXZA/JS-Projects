// Big O = O(n) in iterative solution, in recursive solution Big O(2^n)
// resulting in extremely poor performance> Recursion is poor implementation
// for Fibonacci

// n denotes element position in the Fibonacci sequence, n starts at 0
function recursiveFibonacci(n) {
    // Fibonacci sequence is a sequence in which each number is the sum of the two
    // preceding ones. If F represents a funcation to calculate the Fibonacci 
    // number, then: Fn =Fn-1 + Fn-2 . Each number is the sum of the previous 2 numbers.

    if (n < 2) {
        // returns 0 if n = 0, or 1 if n = 1
        return n;
    }

    return recursiveFibonacci(n - 1) + recursiveFibonacci(n - 2);
}

// console.log(recursiveFibonacci(0));
// console.log(recursiveFibonacci(1));
console.log(recursiveFibonacci(2));
console.log(recursiveFibonacci(6));