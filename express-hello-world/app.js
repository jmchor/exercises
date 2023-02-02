const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/home', (request, response, next) => response.sendFile(`${__dirname}/views/home-page.html`));

// ...

app.get('/cat', (request, response, next) => response.sendFile(`${__dirname}/views/cat-page.html`));

// ...

app.listen(3000, () => console.log('My first app listening on port 3000! '));
