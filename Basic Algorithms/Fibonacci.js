// Big O = O(n)-linear, as n increases as the number of times the given
// loop executes proportionally 

function fibonacci(n) {
    let num1 = 0;
    let num2 = 1;
    let finalArr = [num1, num2];
    let start = finalArr.length;

    for (let i = start; i < n; i++) {
        let num = finalArr[i - 2] + finalArr[i - 1];
        finalArr.push(num);
    }

    console.log(finalArr);
    // finalArr.forEach((el) => {
    //     console.log('*'.repeat(el));
    // });
}

function fibonacci2(n) {
    const fib = [0, 1];

    for (let i = 2; i < n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }

    return fib;
}

// fibonacci(2);
// fibonacci(5);
// fibonacci(7);
// fibonacci(22);