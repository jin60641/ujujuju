'use strict';

var express = require('express');
var router = express.Router();
let path = require('path');
const db = require('./models/index.js');

router.get('/download',(req,res)=>{
	res.redirect('https://drive.google.com/open?id=0Bz_eEQoJXtIULUs1SkVOUENZU00');
});
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

router.use(express.static(path.resolve(__dirname,'..','src')));
router.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'..','src','index.html'));
});

module.exports = router;
