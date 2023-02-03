const express = require('express');

const app = express();

// creates an absolute path pointing to a folder called "views"
app.set('views', `${__dirname}/views`);
app.set('view engine', 'hbs');

app.get('/', (req, res, next) => res.render('index'));
app.get('/about', (req, res, next) => res.render('about'));
app.get('/handlebars', (req, res, next) => {
        const data = {
                name: 'Ironhacker',
                lastName: 'Rocking it!',
                address: {
                        street: 'Your heart',
                        number: 87,
                },
                cities: [
                        'Amsterdam',
                        'Barcelona',
                        'Berlin',
                        'Lisbon',
                        'Madrid',
                        'Mexico City',
                        'Miami',
                        'Paris',
                        'Sao Paulo',
                ],
        };

        res.render('handlebars', data);
});

console.log('this is running');
app.listen(3000);
