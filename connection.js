const mysql = require('mysql');

var connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "sqluser",
    password: "password",
    database: "crud" //in which database you want to store
});

connection.connect((err) => {
    if(!err)
    {
        console.log("Connected to database crud");
    }
    else
    {
        console.log(err);
    }
});



module.exports = connection;