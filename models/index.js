const path = require("path");
const Sequelize = require("sequelize");
const fs = require('fs-extra');

const settings = {
	pool : {
		max : 100,
		min : 0,
		acquire : 30000,
		idle: 10000
	},
	password : "dnfjddlE2@",
	//host : 'root',
	port : 3306,
	database : "ujujuju",
	dialect : "mysql",
	username : "root",
	define: {
		charset: 'utf8',
		dialectOptions: {
			collate: 'utf8_general_ci'
		},
	},
	query : {
	}
}


const sequelize = new Sequelize(settings.database, settings.username, settings.password, settings);
const db = {};

fs
	.readdirSync(__dirname)
	.filter( (file) => {
		return (file.indexOf('.') !== 0) && (file !== 'index.js');
	})
	.forEach( (file) => {
		const model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach( (modelName) => {
	if ("associate" in db[modelName]) {
		db[modelName].associate(db);
	}
});

sequelize.sync(
//	{ force : true }
);
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
