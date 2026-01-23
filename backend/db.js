// mysql2 allow node.js to connect with mysql
const mysql = require("mysql2");

const db = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: "",
    database: "taskflow_db"
});

db.connect((err) => {
    if(err){
        console.log("Connection failed!", err);
    }
    else{
        console.log("Connection Successfully established!");
    }
}
);

module.exports = db;