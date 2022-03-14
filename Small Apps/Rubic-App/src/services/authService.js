const bcrypt = require('bcrypt');

const { SECRET } = require('../constants.js');
const User = require('../models/User.js');
const { jwtSign } = require('../utils/jwtUtils.js');

exports.register = function (username, password, repeatPassword) {
    // service hash functionality
    // return bcrypt.hash(password, 10)
    //     .then(hash => User.create({ username, password: hash }));

    // DB hash functionality
    return User.create({ username, password });

    // console.log(username, password);
    // return User.create(username, password);
};

exports.login = function (username, password) {
    return User.findByUsername(username)
        .then(user => {
            // console.log('>>>' + user);
            // return Promise.all([User.validatePassword(password), user]);
            return Promise.all([bcrypt.compare(password, user.password), user]);

            // try {
            //     return Promise.all([bcrypt.compare(password, user.password), user]);
            // } catch (error) {
            //     console.log(error.message);
            // }
            // return bcrypt.compare(password, user.password)
        })
        .then(([isValid, user]) => {
            if (isValid) {
                return user;
            } else {
                throw { message: 'Username or password can not be found!' };
            }
        })
        .catch(() => null);
}

exports.createToken = function (user) {
    let payload = {
        // username: user.get('username'),
        // _id: user.get('_id'),
        username: user.username,
        _id: user._id,
    };

    const token = jwtSign(payload, SECRET);
    return token;
    // .then(token);
};
