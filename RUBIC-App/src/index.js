const express = require('express');
const initHandlebars = require('./config/handlebars.js');
// const handlebars = require('express-handlebars');
// const { engine } = require('express-handlebars');
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');

const app = express();
initHandlebars(app);
// require('./config/handlebars.js')(app);


app.all('/', (req, res) => {
    // res.write('Hello World');
    // res.end();
    res.render('index');
});

app.listen(5000, console.log.bind(console, 'Application is runnging on http://localhost:5000'));