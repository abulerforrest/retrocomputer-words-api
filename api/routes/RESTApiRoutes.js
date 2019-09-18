const express = require("express");
const router = express.Router();

const apiController = require("../controllers/RESTApiController");

const {check, validationResult} = require('express-validator');

router.get('/all', apiController.getAllWords);
router.get('/id/:id', apiController.getWordsById);

router.get('/random/all',apiController.getAllRandomWords);

router.get('/random/:limit', [
	check('limit', 'Error: The expected value is a number or "all"!').isNumeric()
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
	check('limit', 'Error: The expected limit value is a number!').isNumeric()
],
function (req, res) {

	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(422).jsonp(errors.array());
	} else {
		apiController.getWordsByLimit(req, res);
	}
});

module.exports = router;