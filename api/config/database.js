const mongoose = require('mongoose');

// Init dotenv for server variables
const dotenv = require('dotenv');
dotenv.config();

const dbConnect = () => {
	// Connection string to MongoDB
	const mongoConnect = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

	mongoose.connect(mongoConnect,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	);

	const db = mongoose.connection;

	return db;
}

module.exports = dbConnect();