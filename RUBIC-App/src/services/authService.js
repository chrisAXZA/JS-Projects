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
            // console.log('>>>' + user);
            return Promise.all([user.validatePassword(password), user]);
            // return Promise.all([bcrypt.compare(password, user.password), user]);

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
        // .catch(err => {
        //     console.log(err);
        //     return null;
        // });
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