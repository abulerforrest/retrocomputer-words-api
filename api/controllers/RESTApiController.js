// WordModel
const Word = require('../models/word');

// get all words
exports.getAllWords = (req, res) => {
	Word.find()
	.then(word => {
		console.log(word)
		res.status(200).json({word});
	}).catch(err => {
		res.status(500).json({err});
	});
};

// get words by limit
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

// get word by object id
exports.getWordsById = (req, res) => {

	Word.findById(req.params.id)
	.then(word => {
		res.status(200).json({word});
	}).catch(err => {
		res.status(500).json({err});
	});

};

exports.getRandomWords = (req, res) => {
	const limit = Number(req.params.limit);

	Word.countDocuments().exec(function (err, totalCount) {

		Word.aggregate([
			{$sample: {size: limit}}
		]).then(word => {
			res.status(200).json({word});
		}).catch(err => {
			res.status(500).json({err});
		});

	});
};

exports.getAllRandomWords = (req, res) => {

	Word.countDocuments().exec(function (err, totalCount) {

		Word.aggregate([
			{$sample: {size: totalCount}}
		]).then(word => {
			res.status(200).json({word});
		}).catch(err => {
			res.status(500).json({err});
		});

	});
};