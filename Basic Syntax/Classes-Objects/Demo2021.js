const getValue = key => {
    const { [key]: returnValue } = user;   
    
    return returnValue;
}

function cityRecord(name, population, treasury) {
    const city = {
        name,
        population,
        treasury,
    };

    return city;
}

// console.log(cityRecord('PeshoCity', 2000000, 1000000005));

const myCity = cityRecord('PeshoCity', 2000000, 1000000005);

myCity['house Count'] = 5;

console.log(myCity);

// DELETE

// delete myCity['house Count'];

// console.log(myCity);

// const { population, name } = myCity;
// ({ population, name, houses = myCity['house Count'] } = myCity);
const { population, name, houses = myCity['house Count'] } = myCity;
// const { population, name : fullName, myCity['house Count']: houses } = myCity;

// console.log(houses, name, population);

// GetValue
// const getValue = key => {
//     const { [key]: returnValue } = user;   
//     return returnValue;
// }
// getValue('name') // Should return Alex
// getValue('age') // Should return 43

// Destructure Function
// const user = {
//     'name': 'Alex',
//     'address': '15th Park Avenue',
//     'age': 43
// }
// function logDetails({ name, age }) {
//     console.log(`${name} is ${age} year(s) old!`)
// }
// logDetails(user); 

// Console Object ()
// const { log, warn, error } = console;

// log('I log into the browser console');
// warn('I am a warning');
// error('I am an error');

// Update clone object
// const user = { 
//     'name': 'Alex',
//     'address': '15th Park Avenue',
//     'age': 43
// }

// const updatedUser = {...user, age:56}; // {name: "Alex", address: "15th Park Avenue", age: 56}

// console.log(user); // {name: "Alex", address: "15th Park Avenue", age: 43}

const myObj = {
    name: 'Peter',
    age: 23,
    'hair color': 'Brown',
};

let { age: myAge, name2 } = myObj;

const myAssocArray = {
    'first': 5,
    'second': 10,
    'third': 15,
};

for (let key in myAssocArray) {
    console.log(key);
}

const keys = Object.keys(myAssocArray);

// Array for-of
for (const key of keys) {

}

// Object for-in
for (const key in myAssocArray) {

}

// not array, but iterator
const values = Object.values(myAssocArray);
console.log(values[0]);
// for-of can read iterator
for (const value of values) {

}

const entries = Object.entries(myAssocArray);
// for (const entry of entries) {
//     console.log('key', entry[0]);
//     console.log('value', entry[1]);
// }

// for (const [key, value] of entries) {
//     console.log('key', key);
//     console.log('value', value);
// }

// Function

let person = {
    firstName: 'John',
    lastName: 'Doe',
    age: function (age) {
        return `My age is ${age}!`
    },
    fullName: () => {
        return `${this.firstName} ${this.lastName}`;
    },
    // fullName: function () {
    //     return `${this.firstName} ${this.lastName}`;
    // },
    // fullName() {
    //     return `${this.firstName} ${this.lastName}`;
    // }
}

// Generic function for any given object DEEP COPY
function deepCopy(target) {
    if (Array.isArray(target)) {
        return target.map(deepCopy);
    } else if (typeof target == 'object') {
        return [...Object.entries(target)]
            .reduce((acc, [key, value]) => Object.assign(acc, { [key]: deepCopy(value) }), {});
    } else {
        return target;
    }
}

const myCopy = deepCopy(person);

console.log('*'.repeat(20));
console.log(myCopy);
console.log(myCopy == person);

console.log(person.age(22));
console.log(person.fullName());

// TAKES REFERENCE FROM FUNCTION AND NOT ITS RESULT
const fullName = person.fullName;

console.log(fullName());

// DATA OBJECT, object only containing data. After receiving function turns into object
const otherPerson = {
    firstName: 'Peter',
    lastName: 'Johnson',
};

otherPerson.fullName = fullName;
console.log(otherPerson.fullName());

const myObj2 = {
    name: 'Peter',
    age: 23,
    sayHi() {
        console.log('Hi!');
    }
}

const sayHi = myObj2.sayHi;
sayHi();