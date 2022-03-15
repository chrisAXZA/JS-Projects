const mongoose = require('mongoose');
require('../models/User.js');
require('../models/Ad.js');

// TODO change database name
const dbName = 'job-board';
const connectionString = `mongodb://localhost:27017/${dbName}`;

module.exports = async (app) => {
    try {
        await mongoose.connect(connectionString);

        console.log('Database connected!');

        mongoose.connection.on('error', (err) => {
            console.error('Database error!');
            console.error(err);
        });
    } catch (err) {
        console.error('Error connecting to database!');
        process.exit(1);
    }
};