const bcrypt = require('bcrypt')
const User = require('../models/User.js');

exports.register = function (username, password, repeatPassword) {
    // service hash functionality
    // return bcrypt.hash(password, 10)
    //     .then(hash => User.create({ username, password: hash }));

    // DB hash functionality
    return User.create({username, password});

    // console.log(username, password);
    // return User.create(username, password);
};
