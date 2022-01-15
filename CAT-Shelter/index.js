const express = require('express');
const fs = require('fs');
const path = require('path');
const { engine } = require('express-handlebars');

const catController = require('./controllers/catController.js');
const requestLogger = require('./middlewares/requestLoggerMiddlewares.js');

const app = express();

// set code extension for express and handlebars
app.engine('hbs', engine({
    extname: 'hbs',
    // defaultLayout: 'site'
    // provides alternative default name for main.hbs
}));

// provide new folder name for handlebars to replace default views
// app.set('views','templates');

// indicates to express which code extension to use when not specified
// when not set, render needs to provide code extension
app.set('view engine', 'hbs');

// console.log(path.resolve(__dirname));
// searches for logical static folder in public folder
// app.use('/static', express.static('./public'));
app.use(express.static('./public'));

// use middleware on all routes, application level
// app.use(requestLogger);
// use middleware on custom/specific routes, route level
app.use('/cats', requestLogger);

// use middelware on controller level
// app.use('/cats', requestLogger, catController);
app.use('/cats', catController);


app.get('/', (req, res) => {
    // CUSTOM HTML RESPONSE

    // res.write('Hello World');
    // res.end();
    // res.send('<h1>Hello World</h1>')

    // let absolutePath = path.resolve(__dirname, '/views/home/index.html');
    // +++
    // let absolutePath = path.join(__dirname, '/views/home/index.html');
    // res.sendFile(absolutePath);
    // +++

    // res.sendFile(__dirname + '/views/home/index.html');

    // res.header({
    //     'Content-Type': 'text/html'
    // })

    // res.write(`
    // <h1>Add Breed</h1>

    // <ul>
    // <li><a href="/addBreed">Add Breed</a></li>
    // <li><a href="/addCat">Add Cat</a></li>
    // </ul>
    // `);

    // res.end();

    // Render with Hanldebars

    // res.render('home', { layout: false });
    res.render('home');
});

app.get('/addBreed', (req, res) => {
    // res.header({
    //     'Content-Type': 'text/html'
    // })

    // res.write('<h1>Add Breed</h1>');
    // res.end();

    res.render('addBreed');
});

// middleware on action level
// app.get('/addCat',requestLogger ,(req, res) => {
app.get('/addCat/:catName?', (req, res) => {
    // res.header({
    //     'Content-Type': 'text/html'
    // })

    // res.write('<h1>Add Cat</h1>');
    // res.end();

    let breeds = [
        {name: 'Persian'},
        {name: 'Angora'},
        {name: 'Street'},
        // 'Persian',
        // 'Angora',
        // 'Street'
    ];

    res.render('addCat', {
        name: req.params.catName,
        breeds
    });
});



app.get('/download', (req, res) => {
    res.header({
        'Content-Disposition': 'attachment; filename="cute-cat.jpg"'
    });

    let imageStream = fs.createReadStream('./images/cute-cat.jpg', (err, chunk));
    imageStream.pipe(res);

    // res.download('./images/cute-cat.jpg');
});

app.get('/add*', (req, res) => {
    res.write('Add something else');
    res.end();
});

app.get('/.*cat.*/i', (req, res) => {
    res.write('Cat detected!!!');
    res.end();
});

app.listen(5555, () => console.log('Server is running on port 5555 >>>'));
