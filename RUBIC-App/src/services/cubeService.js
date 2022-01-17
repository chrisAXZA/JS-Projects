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

const getOne = (id) => {
    return Cube.cubes.find(c => c.id == id);
}

const search = (text, from, to) => {
    // const cubes = Cube.cubes.filter(c => {
    let result = Cube.cubes;

    if (text) {
        result = result.filter(c => c.name.toLowerCase().includes(text.toLowerCase()));
    }

    if (from) {
        result = result.filter(c => c.difficulty >= from);
    }

    if (to) {
        result = result.filter(c => c.difficulty <= to);
    }

    return result;
};
// c.name.toLowerCase().includes(text.toLowerCase());
// return cubes;
// };

const cubeService = {
    create,
    getAll,
    getOne,
    search
};

module.exports = cubeService;