const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port:process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
  else {
    console.log("Database Connected Successfully!");
  }
});

module.exports = connection;