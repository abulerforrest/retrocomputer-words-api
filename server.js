// Launching express
const express = require("express");
const app = express();

// Setting port recognision server or local
const port = process.env.PORT || 3000;

// Initializing WordModel
WordModel = require('./api/models/WordModel')

// Getting routes
const routes = require('./api/routes/RESTApiRoutes');
routes(app);

// MongoDB
mongoose = require('mongoose');

bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://zalza:kT7Yhfc3MXsaGfCH@cluster0-6cls4.mongodb.net/test?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Setting listener on port
app.listen(port);

console.log(`REST API launched on: ${port}`);