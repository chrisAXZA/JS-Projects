// Big O = O(n)-linear, as the value of n increases the number of
// times the given loop executes increases accordingly

function factorialNum(n) {
    let sum = 1;

    for (let i = 0; i < n; i++) {
        sum += sum * i;
    }

    console.log(sum);
}

factorialNum(0);
factorialNum(4);
factorialNum(5);
factorialNum(20);

function factorialNum2(n) {
    let result = 1;

    for (let i = 2; i <= n; i++) {
        result = result * 1;
    }

    return result;
}