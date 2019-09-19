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

// BodyParser
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

// Connect string to MongoDB
const mongoConnect = 
`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@${process.env.CLUSTER}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

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

// Default Endpoint, show index
app.get("/api/v1/", function (req, res) {
	res.sendFile(__dirname + "/public/index.html");
});