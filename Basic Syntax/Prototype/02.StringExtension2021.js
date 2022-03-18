// (function () {
//     String.prototype.ensureStart = function (str) {
//         const length = str.length;
//         const subString = this.substring(0, length);

//         if (subString === str) {
//             return this;
//         } else {
//             return str + this;
//         }
//     };

//     String.prototype.ensureEnd = function (str) {
//         const length = str.length;
//         const subString = this.substring(-length);

//         if (substring === str) {
//             return this;
//         } else {
//             return this + str;
//         }
//     };

//     String.prototype.isEmpty = function () {
//         return this.length === 0;
//     };

//     String.prototype.truncate = function (n) {
//         const length = this.length;
//         const presentSpace = this.includes(' ');
//         if (length < n) {
//             return this;
//         } else if (n < 4) {
//             return '.'.repeat(n);
//         } else if (!presentSpace) {
//             return this.substring(0, n - 3) + '...';
//         } else if (length > n) {
//             const index = this.lastIndexOf(' ', n - 3);
//             const splitString = this.substring(0, index);
//             return splitString + '...';
//         }
//     };

//     String.format = function (string, ...params) {
//         const newString = params.reduce((acc, curr, i) => {
//             if (string.includes(`{${i}}`)) {
//                 string = string.replace(`{${i}}`, curr);
//             }

//             return string;
//         }, '');

//         return newString;
//     };
// }())

(function () {
    String.prototype.ensureStart = function (str) {
        // if (this.slice(0, str.length) === str) {
        if (this.startsWith(str)) {
            return this.toString();
        }
        return `${str}${this}`;
    };

    String.prototype.ensureEnd = function (str) {
        if (this.endsWith(str)) {
            return this.toString();
        }
        return `${this}${str}`;
    };

    String.prototype.isEmpty = function () {
        return this.toString() === '';
    };

    String.prototype.truncate = function (n) {
        // 83/100
        if (this.length <= n) {
            return this.toString();
        }

        if (this.includes(' ')) {
            let lastSpaceIndex = this.length;
            do {
                lastSpaceIndex = this.lastIndexOf(' ', lastSpaceIndex - 1);
            } while (lastSpaceIndex !== -1 && lastSpaceIndex + 3 > n)
            return `${this.slice(0, lastSpaceIndex)}...`;
        }

        // alternative
        // if (this.includes(' ')) {
        //     let words = this.split(' ');
        //     // do {
        //     //     words.pop();
        //     // } 

        //     // 83/100
        //     while (words.join(' ').length + 3 > n) {
        //         words.pop();
        //     }
        //     let sentence = `${words.join('')}...`;
        //     return sentence;
        // }

        if (n > 3) {
            let string = `${this.slice(0, n - 3)}...`;
            return string;
        }
        return '.'.repeat(n);
    };

    String.format = function (string, ...params) {
        let replaceRegex = /{(\d+)}/g;
        let replaced = string.replace(replaceRegex, (match, group1) => {
            let index = Number(group1);
            if (params[index] !== undefined) {
                return params[index];
            }

            return match;
        });

        return replaced;
    };

}())

// let a = 'abc';
// console.log(a.ensureStart('ab'));
// console.log(a.ensureEnd('bc'));
// console.log(a.isEmpty());
// console.log(''.isEmpty());

let str = 'my string';
str = str.ensureStart('my');
console.log(str);
str = str.ensureStart('hello ');
console.log(str);
str = str.truncate(16);
console.log(str);
str = str.truncate(14);
console.log(str);
str = str.truncate(8);
console.log(str);
str = str.truncate(4);
console.log(str);
str = str.truncate(2);
console.log(str);
str = String.format('The {0} {1} fox',
    'quick', 'brown');
console.log(str);
str = String.format('jumps {0} {1}',
    'dog');
console.log(str);

;