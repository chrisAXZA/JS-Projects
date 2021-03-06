const Accessory = require('../models/Accessory.js');


async function create(name, description, imageUrl) {
    return Accessory.create({ name, description, imageUrl });
}

async function getAll() {
    return Accessory.find({}).lean();
}

async function getAllWithout(accessoryIds) {
    return Accessory.find({ _id: { $nin: accessoryIds } }).lean();
    // return Accessory.find().where('_id').nin(accessoryIds).lean();
}

const accessoryService = {
    create,
    getAll,
    getAllWithout,
};

// Alternative to module exports
// exports.create = create;

module.exports = accessoryService;