const { Schema, model, Types: { ObjectId } } = require('mongoose');

const NAME_PATTERN = /^[a-zA-Z]+$/;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'A valid username is required!'],
        minlength: [3, 'Username must have at least 3 characters!'],
        validate: {
            validator(value) {
                return NAME_PATTERN.test(value);
            },
            // message: 'Name must have firstname and lastname!',
            message: 'Only latin letters and numbers are allowed for username!',
        },
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    likedPlays: {
        type: [ObjectId],
        ref: 'Play',
        default: [],
    },
});

userSchema.index({ username: 1 }, {
    // unique elements
    unique: true,
    // case insensitive
    collation: {
        locale: 'en',
        strength: 2,
    },
});

const User = model('User', userSchema);

module.exports = User;