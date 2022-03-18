// FREEZE and SEAL lead to slightly slower operation

let cat = {
    name: 'Pepi',
    age: 5,
};

Object.freeze(cat);
// Freeze is used to create unchangeable constant object
// However, only creates shallow copy, if prop refers to other 
// obect as value, then this value-object still can be changed
// and must be additionally freezed through custom functions
// to prevent any changes
// *A frozen object can no longer be changed; 
// freezing an object prevents new properties from being added
// to it, existing properties from being removed, 
// prevents changing the enumerability, configurability, ]
// or writability of existing properties, and prevents 
// the values of existing properties from being changed.
// In addition, freezing an object also prevents its prototype 
// from being changed. freeze() returns the same object
// that was passed in.
cat.age = 10; // TypeError in 'use strict'
cat.gender = male; // TypeError in 'use strict'
console.log(cat);

// Sealed object structure can not be changed but its
// set values can be changed
// *Seal prevents new objects from being added and marking all
// existing props as non-configurable (deletable). Values of
// existing props can still be changed as long as they are 
// marked as writable
Object.seal(cat);
cat.age = 10; // OK
delete cat.age; // TypeError in 'use strict'
console.log(cat);

// Recursive freezing, linear recursion increasing 
// by one with each step
function counter(count = 0) {
    if (count === 1000) {
        console.log('Breaking Point');
        return count;
    }
    return counter(count + 1);
}

const result = counter();