const express = require('express');
const initHandlebars = require('./config/handlebars.js');
const routes = require('./routes.js');
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];
const initDatabase = require('./config/database.js');

// const handlebars = require('express-handlebars');
// const { engine } = require('express-handlebars');
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');

const app = express();

// enables bodyparser for express
app.use(express.urlencoded({
    extended: true,
}));

initHandlebars(app);
// require('./config/handlebars.js')(app);

// app.use('/static', express.static(__dirname + '/public'));
// app.use('/static',express.static('public'));

app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));
app.use(routes);

// console.log(typeof config.PORT);


initDatabase(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, console.log.bind(console, `Application is running on http://localhost:${config.PORT}`));

    })
    .catch(err => {
        console.log('Application init failed: ', err);
    })
// app.listen(config.PORT, console.log.bind(console, `Application is running on http://localhost:${config.PORT}`));



// app.listen(5000, console.log.bind(console, 'Application is runnging on http://localhost:5000'));

// "start": "node app.js",
// "test": "NODE_ENV=test mocha --reporter spec"