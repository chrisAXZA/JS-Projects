const uniqid = require('uniqid');

class Cube {
    static #cubes = [
        {
            id: 'sfhdiofehruioehcn',
            name: 'Mirror Cube',
            description: 'Rubic Cube with mirrors',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mirror_Cube_solved.png/220px-Mirror_Cube_solved.png',
            difficulty: '4'
        },
        {
            id: '1geqjtgwfkyhmdpm9',
            name: 'Ice Cube',
            description: 'Some cold ice cube',
            imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Iced_tea_with_ice_cubes.jpg/220px-Iced_tea_with_ice_cubes.jpg',
            difficulty: '1'
        }
    ];

    constructor(name, description, imageUrl, difficulty) {
        this.id = uniqid(); // sets new id 
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.difficulty = difficulty;
    }

    // static getAll() {
    //     return Cube.#cubes.slice();
    // }

    static get cubes() {
        return Cube.#cubes.slice();
    }

    static add(cube) {
        Cube.#cubes.push(cube);
    }
}

module.exports = Cube;