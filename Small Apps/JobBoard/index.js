const express = require('express');

const routesConfig = require('./config/routes.js');
const expressConfig = require('./config/express.js');
const databaseConfig = require('./config/database.js');

start();

async function start() {
    const app = express();

    expressConfig(app);
    await databaseConfig(app);
    routesConfig(app);

    app.listen(3000, () => console.log('>>> Server running on port 3000'));
};


