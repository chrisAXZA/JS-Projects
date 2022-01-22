// const uniqid = require('uniqid');

// class Cube {
//     static #cubes = [
//         {
//             id: 'sfhdiofehruioehcn',
//             name: 'Mirror Cube',
//             description: 'Rubic Cube with mirrors',
//             imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mirror_Cube_solved.png/220px-Mirror_Cube_solved.png',
//             difficulty: '4'
//         },
//         {
//             id: '1geqjtgwfkyhmdpm9',
//             name: 'Ice Cube',
//             description: 'Some cold ice cube',
//             imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Iced_tea_with_ice_cubes.jpg/220px-Iced_tea_with_ice_cubes.jpg',
//             difficulty: '1'
//         }
//     ];

//     constructor(name, description, imageUrl, difficulty) {
//         this.id = uniqid(); // sets new id 
//         this.name = name;
//         this.description = description;
//         this.imageUrl = imageUrl;
//         this.difficulty = difficulty;
//     }

//     // static getAll() {
//     //     return Cube.#cubes.slice();
//     // }

//     static get cubes() {
//         return Cube.#cubes.slice();
//     }

//     static add(cube) {
//         Cube.#cubes.push(cube);
//     }
// }

const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
    },
    imageUrl: {
        type: String,
        required: true,
        validate: [/^https?:\/\//i, 'invalid image url/'],
        // validate: {
        //     validator: function (value) {
        //         return /^https?:\/\//i.test(value)
        //     },
        //     // message: (value) => console.log(value),
        //     message: (values) => `Image Url ${values.value} is invalid!`
        // },
    },
    difficulty: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

// cubeSchema.path('imageUrl').validate(function (value) {
//     return /^https?\/\//i.test(value)
// });

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;