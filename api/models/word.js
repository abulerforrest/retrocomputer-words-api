const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema(
	{
	_id: mongoose.Schema.Types.ObjectId,
	word: String
	},
	{ 
		collection: process.env.COLLECTION_NAME
	}
);

module.exports = mongoose.model('Word', WordSchema);