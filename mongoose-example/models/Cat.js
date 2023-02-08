// models/Cat.js

const mongoose = require('mongoose');

const { Schema } = mongoose;

const catSchema = new Schema({
        name: { type: String, required: true },
        age: { type: Number, min: 0, max: 30 },
        color: { type: String, enum: ['white', 'black', 'brown'] },
        avatarUrl: { type: String, default: 'images/default-avatar.png' },
        location: {
                address: String,
                city: String,
        },
        countryCode: {
                type: String,
                match: /^[A-Z]{2}$/,
        },
        created: {
                type: Date,
                default: Date.now,
        },
});

const Cat = mongoose.model('Cat', catSchema);

module.exports = Cat;
