const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: [3, 'Username must have at least 3 characters!'],
    },
    password: {
        type: String,
        minlength: [6, 'Password should be at least 6 charactes long!'],
        required: true,
    },
});

// pre => after valiation + before safe
userSchema.pre('save', function (next) {
    // console.log('>>> ' + this);

    // expression function provides this, second arrow function refers to parent this
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });

    // return;
    // next();
});

userSchema.static('findByUsername', function (username) {
    return this.findOne({ username });
    // return this.find({ username });
});

const User = mongoose.model('User', userSchema);

module.exports = User;