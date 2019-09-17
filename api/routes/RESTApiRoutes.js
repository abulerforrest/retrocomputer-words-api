module.exports = function(app) {
    let RESTApiController = require('../controllers/RESTApiController');

    app.route('/getall')
      .get(RESTApiController.getAllWords);

};