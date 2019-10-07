// WordModel Schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		username: { type: String,  required: true },
		password: { type: String, required: true }
	},
	{ 
		collection: process.env.COLLECTION_NAME_USERS
	}
);

module.exports = mongoose.model('User', UserSchema);