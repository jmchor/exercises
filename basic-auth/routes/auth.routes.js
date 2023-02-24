const { Router } = require('express');

const router = new Router();

const bcryptjs = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User.model');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard.js');

const saltRounds = 10;

router.get('/signup', isLoggedOut, (req, res) => res.render('auth/signup'));

router.post('/signup', isLoggedOut, (req, res, next) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
                res.render('auth/signup', {
                        errorMessage: 'All fields are mandatory. Please provide your username, email and password.',
                });
                return;
        }
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

router.get('/userProfile', isLoggedIn, (req, res) => {
        res.render('users/user-profile', { userInSession: req.session.currentUser });
});
/* ---------------------------------------LOGIN--------------------------------------- */

router.get('/login', isLoggedOut, (req, res) => res.render('auth/login'));

router.post('/login', isLoggedOut, async (req, res, next) => {
        console.log('SESSION =====> ', req.session);
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
                        req.session.currentUser = user;
                        res.redirect('/userProfile');
                } else {
                        res.render('auth/login', { errorMessage: 'Incorrect password.' });
                }
        } catch (error) {
                next(error);
        }
});

router.post('/logout', isLoggedIn, (req, res, next) => {
        req.session.destroy((err) => {
                if (err) next(err);
                res.redirect('/');
        });
});

module.exports = router;
