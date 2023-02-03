const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/home', (request, response, next) => response.sendFile(`${__dirname}/views/home-page.html`));

// ...

app.get('/cat', (request, response, next) => response.sendFile(`${__dirname}/views/cat-page.html`));

// ...

app.listen(3000, () => console.log('My first app listening on port 3000! '));

// if ES Modules should be used, it'S this :

// import express from 'express';

// because ESM doesn't have filename or dirname we need to import this
// import * as url from 'url';

// const __filename = url.fileURLToPath(import.meta.url);
// const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// change file extension to .mjs or set type to module in package.json
