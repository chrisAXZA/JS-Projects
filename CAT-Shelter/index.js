const express = require('express');
const fs = require('fs');
const path = require('path');
const catController =  require('./controllers/catController.js');

const app = express();
// console.log(path.resolve(__dirname));

// searches for logical static folder in public folder
// app.use('/static', express.static('./public'));
app.use(express.static('./public'));
app.use('/cats', catController);


app.get('/', (req, res) => {
    // res.write('Hello World');
    // res.end();
    // res.send('<h1>Hello World</h1>')

    // let absolutePath = path.resolve(__dirname, '/views/home/index.html');
    let absolutePath = path.join(__dirname, '/views/home/index.html');
    res.sendFile(absolutePath);
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
});

app.get('/addBreed', (req, res) => {
    res.header({
        'Content-Type': 'text/html'
    })

    res.write('<h1>Add Breed</h1>');
    res.end();
});

app.get('/addCat', (req, res) => {
    res.header({
        'Content-Type': 'text/html'
    })

    res.write('<h1>Add Cat</h1>');
    res.end();
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
