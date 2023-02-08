const express = require('express');
const hbs = require('hbs');

const port = 3000;

const app = express();
const path = require('path');

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => res.render('index'));

app.get('/players', (req, res, next) => res.render('players'));

// app.js

app.get('/teams', (req, res, next) => {
        const data = {
                layout: false,
        };
        res.render('teams', data);
});

app.listen(port);
