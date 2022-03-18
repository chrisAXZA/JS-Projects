function Person(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;

    // alternative, but takes up more memory since new function
    // for each instance (not shared protype function)
    // WRITE
    // this.write = function (message) {
    //     console.log(`${this.firstName} wrote: ${message}`);
    // };
}

// alternative to Person.prototype.write
const myProto = {
    write(message) {
        console.log(`${this.firstName} wrote${message}`);
    }
};

const person4 = new Person('Pesho', 'Neso');
;
// write only part of prototype, but not of Person class
Person.prototype.write = function (message) {
    console.log(`Person wrote: ${message}`);
};

function writeOuter(message) {
    console.log(`${this.firstName} wrote: ${message}`);
}

// const person = new Person('John', 'Abbot');
// const person2 = new Person('pesho', 'Kesho');

// NEW DEMO
function newOperator(constructor, ...params) {
    // 1 Allocate memory
    const result = {};

    // 1+ Assign prototype
    Object.setPrototypeOf(result, Person.prototype);

    // 1 ++ Alterntive combines above 2
    // const result  = Object.create(Person.prototype);
    // const result  = Object.create(myProto);

    // 2 Execute ctor with params, passes object variables to allocated memory context
    constructor.apply(result, params);

    // 3 return memory reference
    return result;
}

const person = newOperator(Person, 'John', 'Abbot');
const person2 = newOperator(Person, 'pesho', 'Kesho');

console.log(person, person2);

// person.writeOuter = writeOuter;
// person2.writeOuter = writeOuter;

// console.log(person);
// console.log(person.write);
// console.log(person.hasOwnProperty('write')); // will return false

person.write('Hello World!');

// list all properties (also prototype ones)
// for (let key in person) {
//     console.log(key);
// }

// console.log(person.write === person2.write);
// console.log(person.writeOuter === person2.writeOuter);
console.log(Person.prototype);
console.log(Person.prototype.__proto__);
