function calorie(input) {
    const obj = input.reduce((acc, curr, i, arr) => {
        if (i % 2 === 0) {
            const name = arr[i];
            acc[name] = 0;
        } else {
            const num = Number(arr[i]);
            const name = arr[i - 1];
            acc[name] = num;
        }

        return acc;
    }, {});

    console.log(obj);
}

// calorie(['Yoghurt', '48', 'Rise', '138', 'Apple', '52']);

function worker(input) {
    if (input.dizziness === true) {
        const water = 0.1 * input.experience * input.weight;
        input.levelOfHydrated += water;
        input.dizziness = false;
    }

    return input;
}

console.log(worker({
    weight: 120,
    experience: 20,
    levelOfHydrated: 200,
    dizziness: true
}));

function carFactory(car) {
    const engines = {
        'Small engine': { power: 90, volume: 1800 },
        'Normal engine': { power: 120, volume: 2400 },
        'Monster engine': { power: 200, volume: 3500 },
    }

    const carriages = {
        Hatchback: { type: 'hatchback', color: '' },
        Coupe: { type: 'coupe', color: '' },
    };

    const result = {};

    result.model = car.model;

    equipEngine();

    equipCarriage(car.carriage, car.color);

    equipWheels(car.wheelsize);

    return result;

    function equipEngine() {
        // for (let {name, engine} in engines) {
        // for (let [name, engine] of Object.entries(engines).sort((a, b) => a.power - b.power)) {
        //     if (engine.power >= car.power) {
        //         result.engine = engines[name];
        //         break;
        //     }
        // }

        const target = Object.entries(engines)
            .sort((a, b) => a.power - b.power)
            .find(eng => eng[1].power >= car.power);

        result.engine = target;
    }

    function equipCarriage(type, color) {
        result.carriage = { type, color };
    }

    function equipWheels(size) {
        size = Math.floor(size);

        if (size % 2 === 0) {
            size--;
        }

        const arr = Array(4).fill(size)

        result.wheels = [size, size, size, size];
        // wheels.fill(size, 0, 3);

        // ARRAY FILL
        // [1, 2, 3].fill(4)                // [4, 4, 4]
        // [1, 2, 3].fill(4, 1)             // [1, 4, 4]
        // [1, 2, 3].fill(4, 1, 2)          // [1, 4, 3]
        // [1, 2, 3].fill(4, 1, 1)          // [1, 2, 3]
        // [1, 2, 3].fill(4, 3, 3)          // [1, 2, 3]
        // [1, 2, 3].fill(4, -3, -2)        // [4, 2, 3]
        // [1, 2, 3].fill(4, NaN, NaN)      // [1, 2, 3]
        // [1, 2, 3].fill(4, 3, 5)          // [1, 2, 3]
        // Array(3).fill(4)                 // [4, 4, 4]
        // [].fill.call({ length: 3 }, 4)   // {0: 4, 1: 4, 2: 4, length: 3}

        // // A single object, referenced by each slot of the array:
        // let arr = Array(3).fill({}) // [{}, {}, {}]
        // arr[0].hi = "hi"            // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
        // const arr = new Array(3);
        // for (let i = 0; i < arr.length; i++) {
        //     arr[i] = new Array(4).fill(1); // Creating an array of size 4 and filled of 1
        // }
    }
}

function carFactory2(input) {
    // destructering Object
    const { model, power, carriage, color, wheelsize } = input;

    function getEngine(power) {
        const engines = [
            { power: 90, volume: 1800 },
            { power: 120, volume: 2400 },
            { power: 200, volume: 3500 },
        ].sort((a, b) => a.power - b.power);

        return engines.find(eng => eng.power >= power);
    }

    function getCarriage(type, color) {
        return { type, color };
    }

    function getWheels(wheelsize) {
        const wheel = Math.floor(wheelsize) % 2 === 0
            ? Math.floor(wheelsize) - 1
            : Math.floor(wheelsize);

        return Array(4).fill(wheel);
    }

    return {
        model: input.model,
        engine: getEngine(input.power),
        carriage: getCarriage(input.carriage, input.color),
        wheels: getWheels(input.wheelsize),
    };
}

console.log(carFactory2({
    model: 'Opel Vectra',
    power: 110,
    color: 'grey',
    carriage: 'coupe',
    wheelsize: 17
}));

/**
 * 
 * @param {[]} input 
 */
function heroic(input) {
    const result = [];

    input.forEach((line, i, arr) => {
        let [hero, level, items] = line.split(' / ');
        level = Number(level);
        items = items ? items.split(', ') : [];
        result.push({ name: hero, level, items });
        // [{"name":"Isacc","level":25,"items":["Apple","GravityGun"]}
    });

    return JSON.stringify(result);
    // return result;
}

// console.log(heroic([
//     'Isacc / 25 / Apple, GravityGun',
//     'Derek / 12 / BarrelVest, DestructionSword',
//     'Hes / 1',
// ]));

/**
 * 
 * @param {[]} input 
 */
function cityPrices(input) {
    // let log = {
    //     'product name': [
    //         {
    //             town: 'Sofia',
    //             price: 12,
    //         },
    //         {
    //             town: 'Peru',
    //             price: 20,
    //         },
    //     ],
    // }

    // if (!log[product]) {
    //     log[product] = [{ town, price: Number(price) }];
    // } else {
    //     log[product] = log[product].price <= Number(price)
    //         ? log[product]
    //         : { town, price: Number(price) };

    //     log[product] = (log[product].price > Number(price) || log[product].town === town)
    //         ? { town, price: Number(price) }
    //         : log[product];
    // }
    // let final = [];
    // for (let productName in log) {
    //     final.push(`${productName} -> ${log[productName].price} (${log[productName].town})`);
    // }

    // return final.join('\n')

    // log[product].push({ town, price: Number(price) });

    const result = [];
    input.forEach(line => {
        let [town, product, price] = line.split(' | ');
        price = Number(price);
        if (!result.some(t => t.product === product)) {
            result.push({
                product,
                town,
                price,
            });
        }

        const productTarget = result.find(p => p.product === product);
        // if (productTarget.price > price && productTarget.product === product) {
        if (productTarget.price > price) {
            productTarget.price = price;
            productTarget.town = town;
        } else if (productTarget.town === town) {
            productTarget.price = price;
        }
    })

    //{productName} -> {productLowestPrice} ({townName})

    const stringResult = [];
    result.forEach(line => stringResult.push(`${line.product} -> ${line.price} (${line.town})`));
    return stringResult.join('\n');
}

console.log(cityPrices([
    'Sample Town | Sample Product | 1000',
    'Sample Town | Orange | 2',
    'Sofia | Orange | 2',
    'Sofia | Sample Product | 200',
    'Sample Town | Peach | 1',
    'Sofia | Orange | 3',
    'Sofia | Peach | 2',
    'New York | Sample Product | 1000.1',
    'New York | Burger | 10',
    'New York | Burger | 20'
]));

/**
 * 
 * @param {[]} input 
 */
function storeCatalogue(input) {
    const store = {};

    input.forEach(line => {
        let [name, price] = line.split(' : ');
        const letter = name[0];
        price = Number(price);
        if (!store[letter]) {
            store[letter] = [];
        }
        store[letter].push({ name, price });

    });
    const letters = Object.keys(store).sort((a, b) => a.localeCompare(b));

    const final = [];

    for (let letter of letters) {
        var products = [...Object.entries(store[letter])].sort((a, b) => a[1].name.localeCompare(b[1].name));
        var products2 = store[letter].sort((a, b) => a.name.localeCompare(b.name));
        // console.log(letter);
        final.push(letter);
        // for (const [name, price] of products2) {
        for (const { name, price } of products2) {
            // console.log(`  ${name}: ${price}`);
            final.push(`  ${name}: ${price}`);
        }
    }

    // for (const letter in store) {
    //     let values = store[letter].map(entry => `  ${entry.name}: ${entry.price}`);
    //     let string = `${letter}\n${values.join('\n')}`;
    //     final.push(string);
    // }
    // Object.entries(store)
    //     .sort((a, b) => a[0].localeCompare(b[0]))
    //     .forEach(entry => {
    //         let string = `${entry[0]}\n${entry[1]
    //             .sort((a, b) => a.name.localeCompare(b.name))}`
    //             .map(entry => `  ${entry.name}: ${entry.price}`)
    //             .join('\n');
    //         result.push(string);
    //     })


    return final.join('\n');
}

// console.log(storeCatalogue(
//     ['Banana : 2',
//         'Rubic\'s Cube : 5',
//         'Raspberry P : 4999',
//         'Rolex : 100000',
//         'Rollon : 10',
//         'Rali Car : 2000000',
//         'Pesho : 0.000001',
//         'Barrel : 10']
// ));

/**
 * 
 * @param {[]} input 
 */
function towns(input) {
    let [table, ...columns] = input;

    // let headings = table.split('|').filter(x => x !== '').map(x => x.trim());
    let headings = splitLine(table);
    let towns = columns.map(splitLine);

    let result = towns.reduce((acc, curr, i, arr) => {
        const [name, lat, lon] = curr;

        acc.push({
            [headings[0]]: name,
            [headings[1]]: lat,
            [headings[2]]: lon,
        });
        return acc;
    }, []);

    return JSON.stringify(result);
    //{"Town":"Sofia",
    // "Latitude":42.7,
    // "Longitude":23.32
    // },
    // console.log(headings);

    // return JSON.stringify(table.map(splitLine).map(entry => {
    //     let obj = 
    //     return obj;
    // }));

    function splitLine(line) {
        // return line.split('|').filter(isEmptyString).map(convertIfNum);
        // return line.split('|').map(x => x.trim()).map(convertIfNum);
        return line.split('|').filter(x => x !== '').map(x => x.trim()).map(convertIfNum);
    }

    function convertIfNum(value) {
        return isNaN(value) ? value : Number(Number(value).toFixed(2));
    }

    function isEmptyString(value) {
        return value !== '';
    }
}

function towns2(input) {
    // let [table, ...columns] = input.map(splitLine);
    let [columns, ...table] = input.map(splitLine);

    // const final =  JSON.stringify(table.map(splitLine).map(entry => {
    return JSON.stringify(table.map(entry => {
        return columns.reduce((acc, curr, index) => {
            acc[curr] = entry[index];
            return acc;
        }, {});

    }));

    // return final;

    function splitLine(line) {
        let string = line.split('|');
        let string2 = string.filter(c => c !== '');
        let string3 = string2.map(x => x.trim());

        return line.split('|').filter(isEmptyString).map(x => x.trim()).map(convertIfNum);
    }

    function convertIfNum(value) {
        return isNaN(value) ? value : Number(Number(value).toFixed(2));
    }

    function isEmptyString(value) {
        return value !== '';
    }
}

// console.log(towns2(
//     [
//         '| Town | Latitude | Longitude |',
//         '| Sofia | 42.696552 | 23.32601 |',
//         '| Beijing | 39.913818 | 116.363625 |'
//     ]
// ));

function rectangle(width, height, color) {
    const result = {
        width,
        height,
        // color: color[0].toUpperCase() + color.slice(1),
        color: capitalize(color),
        calcArea,
        // calcArea: function () {
        //     return this.width * this.height;
        // }

    };

    return result;

    /**
     * 
     * @param {String} word 
     */
    function capitalize(word) {
        return word[0].toUpperCase() + word.slice(1);
    }

    function calcArea() {
        return this.width * this.height;
    }
}

// let rect = rectangle(4, 5, 'red');
// console.log(rect.width);
// console.log(rect.height);
// console.log(rect.color);
// console.log(rect.calcArea());

function createSortedList() {
    const collection = [];

    const result = {
        add,
        remove,
        get,
        size: 0,
    };

    return result;

    function add(num) {
        collection.push(num);
        this.size++;
        collection.sort((a, b) => a - b);
    }

    function remove(index) {
        const valid = checkIndex(index);
        if (valid) {
            collection.splice(index, 1);
            this.size--;
        }
    }

    function get(index) {
        const valid = checkIndex(index);

        if (valid) {
            return collection[index];
        }
    }

    function checkIndex(index) {
        return index >= 0 && index < collection.length;
    }
}

let list = createSortedList();
list.add(5);
list.add(6);
list.add(7);
console.log(list.get(1));
list.remove(1);
console.log(list.get(1));