// routes/book.routes.js

const router = require('express').Router();

const Book = require('../models/Book.model.js'); // <== add this line before your routes

router.get('/books/create', (req, res) => res.render('books/book-create.hbs'));

router.post('/books/create', (req, res, next) => {
        // console.log(req.body);
        const { title, author, description, rating } = req.body;

        Book.create({ title, author, description, rating })
                // .then((bookFromDB) => console.log(`New book created: ${bookFromDB.title}.`))
                .then(() => res.redirect('/books'))
                .catch((error) => next(error));
});

// GET route to display the form to update a specific book
router.get('/books/:bookId/edit', (req, res, next) => {
        const { bookId } = req.params;

        Book.findById(bookId)
                .then((bookToEdit) => {
                        // console.log(bookToEdit);
                        res.render('books/books-edit.hbs', { book: bookToEdit });
                })
                .catch((error) => next(error));
});

// POST route to actually make updates on a specific book
router.post('/books/:bookId/edit', (req, res, next) => {
        const { bookId } = req.params;
        const { title, description, author, rating } = req.body;

        Book.findByIdAndUpdate(bookId, { title, description, author, rating }, { new: true })
                .then((updatedBook) => res.redirect(`/books/${updatedBook.id}`)) // go to the details page to see the updates
                .catch((error) => next(error));
});

// GET route to retrieve and display all the books
router.get('/books', (req, res, next) => {
        Book.find()
                .then((allTheBooksFromDB) => {
                        console.log(allTheBooksFromDB);
                        res.render('books/books-list.hbs', { books: allTheBooksFromDB });
                })
                .catch((error) => {
                        next(error);
                });
});
router.get('/books/:bookId', (req, res) => {
        const { bookId } = req.params;
        console.log('The ID from the URL is: ', bookId);

        Book.findById(bookId)
                .then((specificBook) => res.render('books/book-details.hbs', { book: specificBook }))
                .catch((error) => {
                        console.log('Error while retrieving book details: ', error);
                        next(error);
                });
});

module.exports = router;
