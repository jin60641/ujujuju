const path = require("path");
const Sequelize = require("sequelize");
const fs = require('fs-extra');
const config = require('../config.js');

const sequelize = new Sequelize(config.database, config.username, config.password, config);
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
