// Init express app
const app = express();
const cors = require("cors");
const express = require("express");

const db = require("./api/config/database");

// Use CORS middleware
app.use(cors());

// Init dotenv for server variables
const dotenv = require('dotenv');
dotenv.config();

// Setting port recognision server or local
const port = process.env.PORT || 3000;

// Express validator
require("express-validator");

db.on('error', () => {
	console.error("Couldn't connect to the database ;(");
});

// BodyParser
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting listener on port
app.listen(port);

// Serve static files from public
app.use(express.static('public'));

// Getting routes
const routes = require('./api/routes/RESTApiRoutes');

// Endpoints
app.use('/api/v1/words', routes);

// Default redirect to /api/v1 endpoint
app.get('/', (req, res) => {
	res.redirect('/api/v1');
});

// Default endpoint, launch index.html
app.get("/api/v1/", function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
});