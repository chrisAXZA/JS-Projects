function Person(name) {
    this.name = name;

    // static method are added to function not its prototype
    // which is why instance of function can not use static methods. 2::53
    // since it can not see them. Instance only sees prototype, but not
    // its ctor that created it. Method listed in class-decoration are therefore
    // statics
    // Person.mtStatic = () => { } // declared here
}

Person.prototype.sayHi = function () {
    console.log(`${this.name} says hi!`);
};

function Employee(name, salary) {
    Person.call(this, name);
    this.salary = salary;
}

// Copy not refer to parent prototype
// Employee.prototype = Person.prototype; 
// Error, any changes to Employee prototype will lead to changes in Person protype

Employee.prototype = Object.create(Person.prototype);
// Reference-Copy, Create new object that has specified prototype as prototype

Employee.prototype.collectSalary = function () {
    console.log(`${this.name} collected ${this.salary}`);
};

// OVERWRITE Person functionality throgh Employee instance
// Employee.prototype.sayHi = function () { };

// Employee.prototype.name = 'Employee'; // changes name of prototype from Person to Employee
// deveoloppaper.com / how to understand the prototype inheritance JS
Employee.prototype.constructor.name = 'Employee';

const myEmployee = new Employee('Peter', 60000);

console.log(myEmployee);
myEmployee.collectSalary();
myEmployee.sayHi();