const Cube = require('../models/Cube.js');

// const cubeDb = [
//     {
//         name: 'Mirror Cube',
//         description: 'Rubic Cube with mirrors',
//         imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Mirror_Cube_solved.png/220px-Mirror_Cube_solved.png',
//         difficulty: '4'
//     }
// ];

// const getAll = () => cubeDb.slice();
// const getAll = () => Cube.getAll();
const getAll = () => Cube.cubes;

const create = (name, description, imageUrl, difficulty) => {
    let cube = new Cube(name, description, imageUrl, difficulty);

    // cubeDb.push(cube);
    Cube.add(cube);
};

const cubeService = {
    create,
    getAll
};

module.exports = cubeService;