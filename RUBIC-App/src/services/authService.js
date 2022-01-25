const bcrypt = require('bcrypt')
const User = require('../models/User.js');

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
            return Promise.all([bcrypt.compare(password, user.password), user]);
            // return bcrypt.compare(password, user.password)
        })
        .then(([isValid, user]) => {
            if(isValid) {
                return user;
            } else {
                throw { message: 'Username or password can not be found!' };
            }
        });
}

// exports.login = function (username, password) {
//     return User.findByUsername(username)
//         .then(user => {
//             return bcrypt.compare(password, user.password)
//                 .then(isValid => {
//                     if (isValid) {
//                         return user;
//                     } else {
//                         throw { message: 'Username or password can not be found!' };
//                     }
//                 });
//         });
// }