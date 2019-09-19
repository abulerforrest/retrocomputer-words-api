const express = require("express");
const router = express.Router();

const apiController = require("../controllers/RESTApiController");

const {
	check,
	validationResult
} = require('express-validator');

const maxRequestNumberValue = 14476;

// Middleware validation for routes
const validationRandom = [
	check("limit", "Error: The requested number value is too long!").isLength({ max: 5}),
	check("limit", "Error: The requested number size is not valid!").custom((value, { req }) => {
		return value <= maxRequestNumberValue;
	}),
	check("limit", "Error: Must be a number").isNumeric()
];

const validationLimit = [
	check("limit", "Error: The requested number value is too long!").isLength({ max: 5}),
	check("limit", "Error: The requested number size is not valid!").custom((value, { req }) => {
		return value <= maxRequestNumberValue;
	}),
	check("limit", "Error: The expected limit value is a number").isNumeric()
];

// Routes
router.get('/all', apiController.getAllWords);
router.get('/id/:id', apiController.getWordsById);

router.get('/random/all', apiController.getAllRandomWords);

router.get('/random/:limit', [
	...validationRandom
],
function (req, res) {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).jsonp(errors.array());
	} else {
		apiController.getRandomWords(req, res);
	}

});

router.get('/limit/:limit', [
	...validationLimit
],
(req, res) => {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).jsonp(errors.array());
	} else {
		apiController.getWordsByLimit(req, res);
	}
});

module.exports = router;