module.exports = function(sequelize, DataTypes){
	const Rank = sequelize.define('Rank', {
		id : { type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true },
		name : { type : DataTypes.STRING(32), allowNull : false },
		stage : { type : DataTypes.INTEGER, allowNull : false }
	},{
		timestamps : true,
		paranoid : true,
	});
	return Rank;
};
