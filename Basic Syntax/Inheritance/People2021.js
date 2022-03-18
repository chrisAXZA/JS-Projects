function solution() {
    class Employee {
        // _salary = 0;
        // _taks = [];
        // _length = this._taks.length;

        constructor(name, age, tasks) {
            // Abstract class, should not be instantiated
            // checks by name
            // if (this.constructor.name === 'Employee') {
            // checks by reference
            if (this.constructor === Employee) {
                throw new Error('Can not abstantiate abstract class!');
            }

            this.name = name;
            this.age = age;
            this.salary = 0;
            this.tasks = tasks;
            this._currentTask = 0;
        }

        // get salary() {
        //     return this._salary;
        // }

        // set salary(value) {
        //     this._salary = value;
        // }

        work = function () {
            // if (_length === 0) {
            //     _length = this._taks.length;
            // } else {
            //     return `{employee name} is working on a simple task.`;
            // }
            // let taskIndex  = this._currentTask % this.tasks.length;

            let task = this.tasks[this._currentTask].replace('{name}', this.name);
            this._currentTask = (this._currentTask + 1) % this.tasks.length;
            console.log(task);
        };

        _calculateSalary(){
            return this.salary;
        }

        collectSalary = function () {
            console.log(`${this.name} received ${this._calculateSalary()} this month.`);
        };
    }

    class Junior extends Employee {
        constructor(name, age) {
            super(name, age, ['{name} is working on a simple task.']);
        }
    }

    class Senior extends Employee {
        constructor(name, age) {
            super(name, age, [
                '{name} is working on a complicated task.',
                '{name} is taking time off work.',
                '{name} is supervising junior workers.',
            ]);
        }
    }

    class Manager extends Employee {
        // _dividend = 0;

        constructor(name, age) {
            super(name, age, [
                '{name} scheduled a meeting.',
                '{name} is preparing a quarterly report.',
            ]);
            this.dividend = 0;
        }

        // get dividend() {
        //     return this._dividend;
        // }

        // set dividend(value) {
        //     this._dividend = value;
        // }

        // overwrite
        _calculateSalary(){
            return this.salary + this.dividend;
        }
    }

    return { Employee, Junior, Senior, Manager };
}

const classes = solution();

// let a = new classes.Employee('Pesho', 23);
// let a = new classes.Manager('Pesho', 23);
// a.work();
// a.work();
// a.work();
// a.work();
// a.salary = 300;
// a.dividend = 300;
// a.collectSalary();

const junior = new classes.Junior('Ivan', 25);

junior.work();
junior.work();

junior.salary = 5811;
junior.collectSalary();

const sinior = new classes.Senior('Alex', 31);

sinior.work();
sinior.work();
sinior.work();
sinior.work();

sinior.salary = 12050;
sinior.collectSalary();
const manager = new classes.Manager('Tom', 55);

manager.salary = 15000;
manager.collectSalary();
manager.dividend = 2500;
manager.collectSalary();  