'use strict';

var express = require('express');
var router = express.Router();
const db = require('./models/index.js');

router.post('/game_rank',function(req,res){
	const { name, stage } = req.body;
	db.Rank.create({ name, stage })
	.then( creted => {	
		res.send('good');
	});
});

router.get('/game_getrank',function(req,res){
	db.Rank.findAll({
		order : [ ['stage','desc'] ]
	}).then( ranks => {
		res.send(ranks.map( rank => rank.get({ plain : true })) );
	});
});

var serveStatic = require('serve-static')
router.use(serveStatic(__dirname))
module.exports = router;
