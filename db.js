const mysql = require("mysql2")
require('dotenv').config()

console.log(process.env.PORT);

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "Raji",
//   database: "user"
// });

// const connection = mysql.createConnection({
//     host: "localhost",
//     user: 'root',
//     password: 'Raji',
//     database: "user"
// });

connection.connect((err) => {
    if (err) {
        console.error("Failed to connect:",err);
    } else {
        console.log("Connected to MySQL..!");
    }
});

module.exports = connection;

// const select_query = 'SELECT * FROM users'
// connection.query(select_query,(err,result) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(result);
//     }
// });

// const select_query = 'SELECT * FROM combine where PRICE > ? AND PRICE <? '
// const base_price= [70,100]
// connection.query(select_query, base_price, (err,result) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(result);
//     }
// });

// const insert_query = 'INSERT INTO users (username, email, gender) VALUES (?, ?, ?), (?, ?, ?)'
// const insert_parameters = ["Meghana", "meghana@gmail.com", "Female","Shiva", "shiva@gmail.com", "Male"]
// connection.query(insert_query, insert_parameters, (err,result) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(result);
//         console.log(result.affectedRows, "row was inserted");
//     }
// });

// const delete_query = 'DELETE FROM users where id = ?'
// const delete_parameters = 20
// connection.query(delete_query,delete_parameters, (err,result) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(result);
//     }
// });

// const update_query = 'UPDATE users SET username = ? WHERE email = ?'
// const update_parameters = [Pavan,'shiva@gmail.com']
// connection.query(update_query, update_parameters, (err,result) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log(result);
//     }
// });





