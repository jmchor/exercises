// app.js
const express = require('express');

const app = express();
const hbs = require('hbs');

app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');

app.get('/', (req, res, next) => {
        res.render('index');
});

app.get('/users/:username', (req, res) => {
        res.send(req.params);
});
app.get('/books/:bookId', (req, res, next) => {
        res.send(req.params);
});

app.get('/users/:username/books/:bookId', (req, res, next) => {
        res.send(req.params);
});

app.get('/search', (req, res, next) => {
        res.send(req.query);
});

app.get('/get-user-info', (req, res) => {
        res.render('user-info-form');
});

// the form on get-user-info is a GET req by default; the form has an action named the same as this app.get route, hence it will display the submitted info access through req.query
app.get('/display-user-info', (req, res) => {
        const { name, age, superhero } = req.query;
        res.send(`
    Your name is ${name}
    Your age is ${age}
    Your favorite superhero is ${superhero}
  `);
});

app.listen(3000, () => console.log('App listening on port 3000!'));
