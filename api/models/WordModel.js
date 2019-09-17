'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WordSchema = new Schema({
    word: {
        type: String
    },
    id: {
        type: Number
    }
});

module.exports = mongoose.model('WordModel', WordSchema);