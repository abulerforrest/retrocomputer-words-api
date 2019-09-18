// Init express app
const express = require("express");
const app = express();

// Init dotenv for server variables
const dotenv = require('dotenv');
dotenv.config();


// Setting port recognision server or local
const port = process.env.PORT || 3000;

// ExpressValidator
require("express-validator")

// MongoDB
mongoose = require('mongoose');

bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const mongoConnect = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@cluster0-6cls4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoConnect,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
);

const db = mongoose.connection;

db.on('error', () => { console.log("error!")});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting listener on port
app.listen(port);

// Getting routes
const routes = require('./api/routes/RESTApiRoutes');

// Endpoints
app.use('/api/v1/words', routes);

// Default Endpoint
app.get('/api/v1', (req, res) => {
	res.json("[ RetroComputer Words API ] maintained by abulerforrest.");
});

console.log(`REST API launched on: ${port}`);