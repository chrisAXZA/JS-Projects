const { Schema, model, Types: { ObjectId } } = require('mongoose');

const URL_PATTERN = /^https?:\/\/(.+)/;

const playSchema = new Schema({
    title: {
        type: String,
        required: [true, 'A title is required!'],
    },
    description: {
        type: String,
        required: [true, 'A description is required!'],
        maxlength: [50, 'Description can not be over 50 characters!'],
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
    isPublic: {
        type: Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        default: new Date(),
        required: true,
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
});

const Play = model('Play', playSchema);

module.exports = Play;