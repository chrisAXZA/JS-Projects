const express = require('express');
const initHandlebars = require('./config/handlebars.js');
const routes  = require('./routes.js');

// const handlebars = require('express-handlebars');
// const { engine } = require('express-handlebars');
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');

const app = express();
initHandlebars(app);
// require('./config/handlebars.js')(app);

// app.use('/static', express.static(__dirname + '/public'));
// app.use('/static',express.static('public'));

app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));
app.use(routes);


app.listen(5000, console.log.bind(console, 'Application is runnging on http://localhost:5000'));