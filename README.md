# Retro Computer Words REST API

This is a simple REST API EXPRESS app which delivers words (contains 14476 words!) which I've gathered from various 80's Atari computer magazines, articles, reviews and classic computer game title lists.

I created this API in order to use it in my game WordRazer to get random "nerdy" words from this API.

You can query for all words or random words or also add a limit to how many results you want to receive. It is also possible to query for a specific _id.

The api sends back the result in JSON-format.

# Live site

The API is live at [retrocomputerwordsapi.alexdev.se](http://retrocomputerwordsapi.alexdev.se) to view it in the browser.

# Getting started

This API is open but does require authentication. To get access follow these steps:<br /><br /> 1. Do a `POST` request to endpoint: api/v1/words/signin and include these params to the body:<br /><br /> username: "free",<br /> password: "access" <br /><br> 2. Copy the returned token (which you get in the response - the token is valid for 1h) <br /><br> 3. Then make the `GET` request (To any of the available routes) and include an `Authorization` header with value: `Bearer {your token}`<br /> <b>voila!</b>

## Prerequisites

To run this app locally you'll need Node.JS installed. Then just clone it and then run "npm i" to install the dependencies.

### Running the app

In the project directory, you can run:

### `nodemon server.js`

Which launches the server.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
With nodemon you will be able to see any errors in the console.

### Endpoints

#### [GET] api/v1/words/all &#8594; Get all words
#### [GET] api/v1//words/limit/:limit &#8594; Get words by limit [number 1-14476]
#### [GET] api/v1//words/random/all &#8594; Get all words in random order
#### [GET] api/v1//words/random/:limit &#8594; Get random words by limit [number 1-14476]
#### [GET] api/v1/words/id/:id &#8594; Get a specific word by id

### Live URL Test

The API has been deployed to Heroku hosting,

Feel free to use it, at this moment it doesn't need any authentication:<br />
https://retrocomputer-words-api.herokuapp.com/

## Built With

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Using:

* [Express.JS](https://expressjs.org/) - Web framework
* [Node.JS](https://nodejs.org/en/) - Open source server environment
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/) -  Cloud MongoDB service
* [Mongoose](https://mongoosejs.com/) - Mongodb object modeling for node.js
* [Express-Validator](https://express-validator.github.io/) - Express validator Middleware
* [JWT](https://jwt.io/) - For authentication
* [bcrypt](https://github.com/kelektiv/node.bcrypt.js/) - For hashing

## Contributing

Please read [CONTRIBUTING.md] for details on the code of conduct, and the process for submitting pull requests to this project.

## Authors

* **Alexander Bulér Forrest** - *Initial work* - [abulerforrest](https://github.com/abulerforrest)

## License

This project is licensed under the GNU AGPLv3 License - see [AGPLv3](https://choosealicense.com/licenses/agpl-3.0/)

## Acknowledgments
