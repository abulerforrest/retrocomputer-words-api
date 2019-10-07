const express = require("express");
const router = express.Router();

// middleware for JWT auth
const auth = require("../middleware/auth");

const apiController = require("../controllers/RESTApiController");

const {
	check,
	validationResult
} = require('express-validator');

const maxRequestNumberValue = 14476;

// Middleware validation for routes
const validationRandom = [
	check("limit", "Error: The requested number value is too long!").isLength({ max: 5}),
	check("limit", "Error: The requested number size isn't valid!").custom((value, { req }) => {
		return value <= maxRequestNumberValue;
	}),
	check("limit", "Error: Must be a number").isNumeric()
];

const validationLimit = [
	check("limit", "Error: The requested number value is too long!").isLength({ max: 5}),
	check("limit", "Error: The requested number size isn't valid!").custom((value, { req }) => {
		return value <= maxRequestNumberValue;
	}),
	check("limit", "Error: The expected limit value is a number").isNumeric()
];

// Routes
router.get('/all', auth, apiController.getAllWords);
router.get('/id/:id', auth, apiController.getWordsById);

router.get('/count', auth, apiController.getTotalCount);

router.get('/random/all', auth, apiController.getAllRandomWords);

router.get('/random/:limit', auth, [
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

router.get('/limit/:limit', auth, [
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

router.post('/signin', apiController.userSignIn);

module.exports = router;