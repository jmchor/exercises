const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
        {
                title: String,
                description: String,
                author: String,
                rating: Number,
        },
        {
                timestamps: trze,
        }
);

module.exports = model('Book', bookSchema);
