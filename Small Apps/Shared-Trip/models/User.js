const { Schema, model, Types: { ObjectId } } = require('mongoose');

const EMAIL_PATTERN = /^([a-zA-Z]+)@([a-zA-Z]+)\.([a-zA-Z]+)$/;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'A valid email is required!'],
        validate: {
            validator(value) {
                return EMAIL_PATTERN.test(value);
            },
            // message: 'Name must have firstname and lastname!',
            message: 'Email is not valid!',
        },
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: { values: ['male', 'female'], message: 'Gender must be male of female!' },
        required: true,
    },
    trips: {
        type: [ObjectId],
        ref: 'Trip',
        default: [],
    },
});

userSchema.index({ email: 1 }, {
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