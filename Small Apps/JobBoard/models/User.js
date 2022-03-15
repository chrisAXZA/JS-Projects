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
            message: 'Email is not valid!',
        },
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        maxlength: [40, 'Description can not be over 40 characters!'],
        required: [true, 'A description is required!'],
    },
    myAds: {
        type: [ObjectId],
        ref: 'Ad',
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