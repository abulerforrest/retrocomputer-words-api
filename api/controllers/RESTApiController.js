'use strict';

var mongoose = require('mongoose'),
    Word = mongoose.model('WordModel');

exports.getAllWords = function(req, res) {
    Word.find({}, function(err, task) {
        if (err)
            res.send(err);
            res.json(task);
    });
};