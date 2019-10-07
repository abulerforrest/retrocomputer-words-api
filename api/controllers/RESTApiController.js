// Models
const Word = require('../models/word');
const User = require("../models/user");

// jwt
const jwt = require('jsonwebtoken');

// bcrypt
const bcrypt = require("bcrypt");

// Get total count
exports.getTotalCount = (req, res) => {
	Word.countDocuments({}, (err, count) => {
		if(err) {
			res.status(500).json({err});
		}
		else {
			res.status(200).json({count});
		}
	});
};

// Get all words
exports.getAllWords = (req, res) => {
	Word.find()
	.then(word => {
		res.status(200).json({word});
	}).catch(err => {
		res.status(500).json({err});
	});
};

// Get words by limit
exports.getWordsByLimit = (req, res) => {

	const limit = Number(req.params.limit);

	if(limit === 0) {
		res.status(200).json([]);		
	} else {
		Word.find().limit(limit)
		.then(word => {
			res.status(200).json({word});
		}).catch(err => {
			res.status(500).json({err});
		});
	}
};

// Get word by object id
exports.getWordsById = (req, res) => {

	Word.findById(req.params.id)
	.then(word => {
		res.status(200).json({word});
	}).catch(err => {
		res.status(500).json({err});
	});

};

// Get random words by limit
exports.getRandomWords = (req, res) => {

	const limit = Number(req.params.limit);

	Word.countDocuments().exec(() => {

		Word.aggregate([
			{$sample: {size: limit}}
		]).then(word => {
			res.status(200).json({word});
		}).catch(err => {
			res.status(500).json({err});
		});

	});
};

// Get all random words
exports.getAllRandomWords = (req, res) => {

	Word.countDocuments().exec((err, totalCount) => {

		Word.aggregate([
			{$sample: {size: totalCount}}
		]).then(word => {
			res.status(200).json({word});
		}).catch(err => {
			res.status(500).json({err});
		});

	});
};

// Handle user Sign in
exports.userSignIn = (req, res) => {
	User.find({
		username: req.body.username
	})
	.exec()
	.then(user => {
		if(user.length < 1) {
			return res.status(401).json({
				message: "Auth failed ;("
			});
		}
		bcrypt.compare(req.body.password, user[0].password, (err) => {
			if(err) {
				return res.status(401).json({
					message: "Auth failed ;("
				});
			}
			if(res) {
				const token = jwt.sign({
					username: user[0].username,
					userId: user[0]._id
				},
				process.env.JWT_KEY,
				{
					expiresIn: "1h"
				});
				return res.status(200).json({
					message: "Success! Copy the token and use key: 'Authorization' value: 'Bearer {token}' in Headers when making a GET requests to the routes.",
					token: token
				});
			}
		});
	})
	.catch(err => {
		res.status(500).json({
			error: err
		});
	});

};