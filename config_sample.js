let obj = {
    pool : {
        max : 100,
        min : 0,
        acquire : 30000,
        idle: 10000
    },
    password : "db password",
    //host : 'root',
    port : 3306,
    database : "ujujuju",
    dialect : "mysql",
    username : "db username",
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci'
        },
    },
    query : {
    }
}

module.exports = obj;
