const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/usertest')
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

// const data = { name: 'Alice', password: 'ironhack2018', job: 'Architect' };

// // Mongoose allows us to use a callback pattern
// // to handle the completion of the asynchronous operation
// // User.create(data, (error, user) => {
// //         if (error) {
// //                 console.log('An error happened:', error);
// //                 return;
// //         }
// //         console.log('The user is saved and its value is: ', user);
// // });

// // The same code as above but with a Promise version
// User.create(data)
//         .then((user) => console.log('The user is saved and its value is: ', user))
//         .catch((error) => console.log('An error happened while saving a new user:', error));

User.updateOne({ name: 'Alice' }, { company: 'Ironhack' })
        .then((user) => console.log('User was updated!'))
        .catch((error) => console.log('Error while updating user: ', error));

User.find({ name: /alice/i })
        .then((users) => {
                console.log('The users found with "alice/i" are: ', users);
        })
        .catch((error) => {
                console.log('Error while getting users: ', error);
        });
