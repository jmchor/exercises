const { Router } = require('express');

const router = new Router();

const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User.model');

const saltRounds = 10;

router.get('/signup', (req, res) => res.render('auth/signup'));

router.post('/signup', (req, res, next) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
                res.render('auth/signup', {
                        errorMessage: 'All fields are mandatory. Please provide your username, email and password.',
                });
                return;
        }
        // make sure passwords are strong:

        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!regex.test(password)) {
                res.status(500).render('auth/signup', {
                        errorMessage:
                                'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.',
                });
                return;
        }

        bcryptjs.genSalt(saltRounds)
                .then((salt) => bcryptjs.hash(password, salt))
                .then((hashedPassword) =>
                        User.create({
                                // username: username
                                username,
                                email,
                                // passwordHash => this is the key from the User model
                                //     ^
                                //     |            |--> this is placeholder (how we named returning value from the previous method (.hash()))
                                passwordHash: hashedPassword,
                        })
                )
                .then((userFromDB) => {
                        console.log('Newly created user is: ', userFromDB);
                        res.redirect('/userProfile');
                })
                .catch((error) => {
                        if (error instanceof mongoose.Error.ValidationError) {
                                res.status(500).render('auth/signup', { errorMessage: error.message });
                        } else if (error.code === 11000) {
                                res.status(500).render('auth/signup', {
                                        errorMessage:
                                                'Username and email need to be unique. Either username or email is already used.',
                                });
                        } else {
                                next(error);
                        }
                });
});

router.get('/userProfile', (req, res) => res.render('users/user-profile'));

/* ---------------------------------------LOGIN--------------------------------------- */

router.get('/login', (req, res) => res.render('auth/login'));

router.post('/login', async (req, res, next) => {
        const { email, password } = req.body;

        if (email === '' || password === '') {
                res.render('auth/login', {
                        errorMessage: 'Please enter both email and password to log in.',
                });
                return;
        }

        try {
                const user = await User.findOne({ email });
                if (!user) {
                        res.render('auth/login', {
                                errorMessage: 'Email is not registered. Try with other email.',
                        });
                } else if (bcryptjs.compareSync(password, user.passwordHash)) {
                        res.render('users/user-profile', { user });
                } else {
                        res.render('auth/login', { errorMessage: 'Incorrect password.' });
                }
        } catch (error) {
                next(error);
        }
});

module.exports = router;
