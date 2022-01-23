const Accessory = require('../models/Accessory.js');


async function create(name, description, imageUrl) {
    return Accessory.create({ name, description, imageUrl });
}

const accessoryService = {
    create,
};

// Alternative to module exports
// exports.create = create;

module.exports = accessoryService;