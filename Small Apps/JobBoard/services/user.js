const { hash, compare } = require('bcrypt');

const User = require('../models/User.js');

async function register(email, password, description) {
    const existing = await getUserByEmail(email);
    // console.log(existing);

    if (existing) {
        throw new Error('Email is taken!');
    }

    const hashedPassword = await hash(password, 10);

    const user = new User({
        email,
        hashedPassword,
        description,
    });

    await user.save();

    return user;
}

async function login(email, password) {
    const user = await getUserByEmail(email);

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

async function getUserByEmail(email) {
    const user = User.findOne({
        email: new RegExp(`^${email}$`, 'i'),
    });

    return user;
}

module.exports = {
    login,
    register,
};
