const jwt = require('jsonwebtoken');
const { SECRET } = require('../constants.js');

exports.jwtSign = function (payload, secret) {
    let promise = new Promise((resolve, reject) => {
        jwt.sign(payload, secret, function (err, token) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });

    return promise;
};
