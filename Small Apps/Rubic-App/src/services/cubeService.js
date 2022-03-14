const Accessory = require('../models/Accessory.js');
const Cube = require('../models/Cube.js');

const getAll = () => Cube.find({}).lean();

const getOne = (id) => {
    const cube = Cube.findById(id).populate('accessories').lean();
    return cube;
}

const create = (name, description, imageUrl, difficulty) => {
    // let cube = new Cube(name, description, imageUrl, difficulty);
    let cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty
    });

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

const updateOne = (cubeId, cube) => {
    return Cube.findByIdAndUpdate(cubeId, cube, { runValidators: true });
};

const cubeService = {
    create,
    getAll,
    getOne,
    search,
    attachAccessory,
    deleteOne,
    updateOne,
};

module.exports = cubeService;