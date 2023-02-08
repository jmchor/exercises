/* eslint-disable no-useless-return */
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/exampleApp')
        .then((x) => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
        .catch((err) => console.error('Error connecting to mongo', err));

// When successfully connected
mongoose.connection.on('connected', () => console.log('Mongoose default connection open'));

// If the connection throws an error
mongoose.connection.on('error', (err) => console.log(`Mongoose default connection error: ${err}`));

// When the connection is disconnected
mongoose.connection.on('disconnected', () => console.log('Mongoose default connection disconnected'));

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
        mongoose.connection.close(() => {
                console.log('Mongoose default connection disconnected through app termination');
                process.exit(0);
        });
});

const Cat = mongoose.model('Cat', { name: String });

function addNewCat(catName) {
        const kitty = new Cat({ name: 'Ironhacker' });

        kitty.save()
                .then((newCat) => console.log(`A new cat is created: ${newCat}!`))
                .catch((err) => console.log.apply(`Error while creating a new cat: ${err}`));
}

// Cat.find({}, (err, cats) => {
//         if (err) {
//                 console.log(`Error occurred during getting cats from DB: ${err}`);
//                 return;
//         }
//         console.log(`Got all the CATS!`);
//         cats.forEach((cat) => console.log(`--> cat: ${cat.name}`));
// });

function showCats() {
        Cat.find()
                .then((catsFromDB) => {
                        // catsFromDB is a placeholder and represents an array of Cat instances
                        catsFromDB.forEach((oneCat) => console.log(` --> cat: ${oneCat.name}`));
                })
                .catch((error) => console.log(`Error occurred during getting cats from DB: ${error}`));
}

function addTenCats() {
        for (let i = 0; i < 10; i += 1) {
                addNewCat(`Ironhacker ${i}`);
        }
}
