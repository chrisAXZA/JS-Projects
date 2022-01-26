const Accessory = require('../models/Accessory.js');
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

// const getAll = () => Cube.cubes;
const getAll = () => Cube.find({}).lean();

const getOne = (id) => {
    const cube = Cube.findById(id).populate('accessories').lean();
    return cube;

    // const cube2 = Cube.findById(id);
    // return Cube.findById(id);

    // return Cube.cubes.find(c => c.id == id);
}

const create = (name, description, imageUrl, difficulty) => {
    // let cube = new Cube(name, description, imageUrl, difficulty);
    let cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty
    });

    // cubeDb.push(cube);
    // Cube.add(cube);

    return cube.save();
};

const search = async (text, from, to) => {
    // const cubes = Cube.cubes.filter(c => {
    // let result = Cube.cubes;
    let result = await getAll();

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
const attachAccessory = async (cubeId, accessoryId) => {
    let cube = await Cube.findById(cubeId);
    let accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory);
    // cube.accessories.push({_id: accessory._id});
    return cube.save();
};

const deleteOne = (cubeId) => {
    return Cube.findByIdAndDelete(cubeId);
};

const cubeService = {
    create,
    getAll,
    getOne,
    search,
    attachAccessory,
    deleteOne,
};

module.exports = cubeService;