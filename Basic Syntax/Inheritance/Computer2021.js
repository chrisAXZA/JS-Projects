function createComputerHierarchy() {
    class Component {
        constructor(manufacturer) {
            if (this.constructor === Component) {
                throw new Error('Cannot instantiate absract class!');
            }

            this.manufacturer = manufacturer;
        }
    }

    class Keyboard extends Component {
        constructor(manufacturer, responseTime) {
            // this.manufacturer = manufacturer;
            super(manufacturer);
            this.responseTime = responseTime;
        }
    }

    class Monitor extends Component {
        constructor(manufacturer, width, height) {
            // this.manufacturer = manufacturer;
            super(manufacturer);
            this.width = width;
            this.height = height;
        }
    }

    class Battery extends Component {
        constructor(manufacturer, expectedLife) {
            // this.manufacturer = manufacturer;
            super(manufacturer);
            this.expectedLife = expectedLife;
        }
    }

    class Computer extends Component {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace) {
            super(manufacturer);
            // super must come before this.constructor
            if (this.constructor === Computer) {
                throw new Error('Can not abstantiate abstract class!');
            }
            // this.manufacturer = manufacturer;

            this.processorSpeed = processorSpeed;
            this.ram = ram;
            this.hardDiskSpace = hardDiskSpace;
        }
    }

    class Laptop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, weight, color, battery) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace);
            this.weight = weight;
            this.color = color;
            this.battery = battery;
        }

        get battery() {
            return this._battery;
        }

        set battery(value) {
            // if (value.constructor !== Battery) {
            if (!(value instanceof Battery)) {
                // requires TypeError
                throw new TypeError('Value is not of Battery instance!');
            }

            this._battery = value;
        }
    }

    class Desktop extends Computer {
        constructor(manufacturer, processorSpeed, ram, hardDiskSpace, keyboard, monitor) {
            super(manufacturer, processorSpeed, ram, hardDiskSpace)
            this.keyboard = keyboard;
            this.monitor = monitor;
        }

        get keyboard() {
            return this._keyboard;
        }

        set keyboard(value) {
            // if (value.constructor !== Keyboard) {
            if (!(value instanceof KeyboardEvent)) {
                throw new TypeError('Value is not of Keyboard instance!');
            }

            this._keyboard = value;
        }

        get monitor() {
            return this._monitor;
        }

        set monitor(value) {
            // if (value.constructor !== Monitor) {
            if (!(value instanceof Monitor)) {
                throw new TypeError('Value is not of Monitor instance!');
            }

            this._monitor = value;
        }
    }

    return {
        Component,
        Battery,
        Keyboard,
        Monitor,
        Computer,
        Laptop,
        Desktop,
    }
}

let classes = createComputerHierarchy();
let Computer = classes.Computer;
let Laptop = classes.Laptop;
let Desktop = classes.Desktop;
let Monitor = classes.Monitor;
let Battery = classes.Battery;
let Keyboard = classes.Keyboard;

let battery = new Battery('Energy', 3);
let keyboard = new Keyboard('PeshoBoard', 25);
console.log(battery);
let laptop = new Laptop("Hewlett Packard", 2.4, 4, 0.5, 3.12, "Silver", battery);
// let laptop = new Laptop("Hewlett Packard", 2.4, 4, 0.5, 3.12, "Silver", keyboard);
console.log(laptop);
