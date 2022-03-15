const express = require('express');
const cookieParser = require('cookie-parser');
const initHandlebars = require('./config/handlebars.js');
const routes = require('./routes.js');
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];
const initDatabase = require('./config/database.js');
const { auth } = require('./middlewares/authMiddleware.js');

// const handlebars = require('express-handlebars');
// const { engine } = require('express-handlebars');
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');

const app = express();

// enables bodyparser for express
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());
app.use(auth);

initHandlebars(app);

app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));
app.use(routes);

initDatabase(config.DB_CONNECTION_STRING)
    .then(() => {
        app.listen(config.PORT, console.log.bind(console, `Application is running on http://localhost:${config.PORT}`));

    })
    .catch(err => {
        console.log('Application init failed: ', err);
    });
