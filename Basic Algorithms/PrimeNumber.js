// Big O = O(n^2) or O(n) - quadratic or linear, 
// with two (nested) loops iterations are larger than input value

function prime(n) {
    // Prime number must be greater than 1
    if (n < 2) {
        return false;
    }

    let isPrime = true;

    for (let i = 2; i <= n; i++) {
        for (let j = 2; j <= n; j++) {
            if (i * j === n) {
                isPrime = false;
                console.log(i, j);
            }
        }
    }

    return console.log(isPrime);
}

// prime(2);
// prime(3);
// prime(4);
// prime(5);
// prime(18);
// prime(19);
// prime(33);

function prime2(n) {
    if (n < 2) {
        return false;
    }

    for (i = 2; i < n; i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}

// Big O: O(sqrt(n)) iterations of given loop are smaller than the size of n
function primeOptimized(n) {
    if (n < 2) {
        return false;
    }

    // Integers larger than the square root do not need to be checked since whenever
    // n=a*b, one of the two numbers is less than or equal to the square root of n
    for (i = 2; i < Math.sqrt(n); i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}