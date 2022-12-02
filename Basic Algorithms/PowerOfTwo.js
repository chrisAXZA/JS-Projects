// Big O: O(n/2) | O(square(n)) number of iterations is no more than half/square of
// of the value of n

function power(n) {
    if (n === 2) {
        return true;
    }

    // for (let i = 2; i <= n / 2; i++) {
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (2 ** i === n) {
            return true;
        }
    }

    return false;
}

// Big O: O(log n) n/2 per iteration, the number of instructions increases with n, but with
// a reduced amount

function power2(n) {
    if (n < 1) {
        return false;
    }

    while (n > 1) {
        if (n % 2 !== 0) {
            return false;
        }

        n = n / 2;
    }

    return true;
}

// Big O: O(1) constant, line of code is only executed once, regardless of the value of n

function powerBitwise(n) {
    if (n < 1) {
        return false;
    }

    return (n & (n - 1)) === 0;
}

// console.log(power(4));
// console.log(power(120));
// console.log(power(128));
// console.log(power(65536));
console.log(powerBitwise(33554432));
console.log(powerBitwise(33551432));