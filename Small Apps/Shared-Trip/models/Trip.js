const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const playSchema = new Schema({
    startPoint: {
        type: String,
        minlength: [4, 'Start Point can not be over 4 characters!'],
        required: [true, 'A start point is required!'],
    },
    endPoint: {
        type: String,
        minlength: [4, 'End point can not be over 4 characters!'],
        required: [true, 'An end point is required!'],
    },
    date: {
        type: String,
        required: [true, 'A date is required!'],
    },
    time: {
        type: String,
        required: [true, 'A time is required!'],
    },
    imageUrl: {
        type: String,
        required: [true, 'An image URL is required!'],
        validate: {
            validator(value) {
                return URL_PATTERN.test(value);
            },
            message: 'Image URL must be valid!',
        }
    },
    carBrand: {
        type: String,
        minlength: [4, 'Car brand can not be over 4 characters!'],
        required: [true, 'A carBrand is required!'],
    },
    seats: {
        type: Number,
        min: [0, 'Seats must be a positive number!'],
        max: [4, 'Seats can not be than 4!'],
        required: [true, 'Seats are required!'],
    },
    price: {
        type: Number,
        min: [1, 'Price must start from 1!'],
        max: [50, 'Price can not be than 50!'],
        required: [true, 'A price is required!'],
    },
    description: {
        type: String,
        minlength: [10, 'Description can not be over 10 characters!'],
        required: [true, 'A description is required!'],
    },
    owner: {
        type: ObjectId,
        ref: 'User',
        required: true,
    },
    buddies: {
        type: [ObjectId],
        ref: 'User',
        default: [],
    },
});

const Trip = model('Trip', playSchema);

module.exports = Trip;