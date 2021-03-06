const { hash, compare } = require('bcrypt');

const User = require('../models/User.js');

async function register(username, password) {
    const existing = await getUserByUsername(username);
    // console.log(existing);

    if (existing) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        username,
        hashedPassword,
    });

    await user.save();

    return user;
}

async function login(username, password) {
    const user = await getUserByUsername(username);

    if (!user) {
        // throw new Error('User does not exist!');
        throw new Error('Incorrect username or password!');
    }

    const hasMatch = await compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Incorrect username or password!');
    }

    return user;
}

async function getUserByUsername(username) {
    const user = User.findOne({
        username: new RegExp(`^${username}$`, 'i'),
    });

    return user;
}

module.exports = {
    login,
    register,
};
