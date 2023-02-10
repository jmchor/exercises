// app.js
const express = require('express');

const app = express();
const hbs = require('hbs');

const bodyParser = require('body-parser');
// 2. let know your app you will be using it
app.use(bodyParser.urlencoded({ extended: true }));
app.use(myFakeMiddleware);
function myFakeMiddleware(req, res, next) {
        console.log('myFakeMiddleware was called!');
        req.secretValue = 'swordfish';

        next();
}

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

app.get('/login', (req, res) => res.render('login'));

// app.post('/login', (req, res) => res.send('Login form submitted!'));
app.post('/login', (req, res) => {
        // What ES6 feature could we use to clean these two lines up?
        const { email, password } = req.body;

        if (email === 'ironhacker@gmail.com' && password === 'password') {
                res.send('Welcome!');
        } else {
                res.send('Go away.');
        }
});

app.get('/test', (req, res) => {
        const mySecret = req.secretValue;
        res.send(mySecret);
});

// ...

app.listen(3000, () => console.log('App listening on port 3000!'));
