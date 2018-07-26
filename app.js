var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes.js');

var express = express();
var port = 3001;

express.use(bodyParser.json());
express.use(bodyParser.urlencoded({
	extended:true
}));

express.use('/', routes);

var server = express.listen(port, function () {
	console.log('Express server listening on port ' + server.address().port);
});

module.exports = express;
