const express = require('express');
const handlebars = require('express-handlebars');
const { engine } = require('express-handlebars');
const path = require('path');
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');

const app = express();

app.set('views', path.resolve('./src/views'));
// console.log(path.resolve('./src/views'));
app.engine('hbs', engine({
    extname: 'hbs'
}));

app.set('view engine', 'hbs');

app.all('/', (req, res) => {
    // res.write('Hello World');
    // res.end();
    res.render('index', {layout: false});
});

app.listen(5000, console.log.bind(console, 'Application is runnging on http://localhost:5000'));