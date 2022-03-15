const { Schema, model, Types: { ObjectId } } = require('mongoose');

// TODO validation
const URL_PATTERN = /^https?:\/\/(.+)/;

const playSchema = new Schema({
    headline: {
        type: String,
        minlength: [4, 'Headline must be at least 4 characters!'],
        required: [true, 'A headline is required!'],
    },
    location: {
        type: String,
        minlength: [8, 'Location must be at least 8 characters!'],
        required: [true, 'A location is required!'],
    },
    companyName: {
        type: String,
        minlength: [3, 'Company name must be at least 3 characters!'],
        required: [true, 'A company name is required!'],
    },
    description: {
        type: String,
        maxlength: [40, 'Description can not be over 40 characters!'],
        required: [true, 'A description is required!'],
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    users: {
        type: [ObjectId],
        ref: 'User',
        default: [],
    },
}, {
    timestamps: true,
});

const Ad = model('Ad', playSchema);

module.exports = Ad;