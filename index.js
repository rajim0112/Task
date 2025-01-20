// ************************Back <-> Front*********************

// const express = require("express")
// const users = require("./user") 
// const cors = require('cors')
// const db = require('./db')

// const app = express()
// require('dotenv').config()

// app.use(express.urlencoded({extended: false}))
// app.use(express.json({extended:false}))

// app.use(cors({
//     origin: "http://localhost:3000",
//     method: ["GET", "POST", "PATCH", "DELETE"]
// }))

// app.use('/user', users);

// app.listen(process.env.PORT, () => console.log("Server has Started..!"))

// *****************Postman related code*********************

const express = require("express")
const mysql = require("mysql2")
const app = express()

const cors = require('cors')
require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json({extended:false}))

app.use(cors({
    origin: "http://localhost:3000",
    method: ["GET", "POST", "PATCH", "DELETE"]
}))

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

connection.connect((err) => {
    if(err) {
        console.log("Failed to Connect:", err);
    }else {
        console.log("Connected to MYSQL.....");
    }
});

app.get('/users/getAll',(req,res) => {
const select_all = "SELECT * FROM users;"
connection.query(select_all,(err,result) => {
    if(err) {
        res.status(400).json({message: err.sqlMessage})
    } else {
        res.status(200).json(result)
    }
})
})

app.get('/users/getById/:id',(req,res) => {
    const id = req.params.id;
    const select_byId = "SELECT * FROM users WHERE id= ?;"
    connection.query(select_byId, id,(err,result) => {
        if(err) {
            res.status(400).json({message: err.sqlMessage})
        } else {
            if (result.length != 0) {
                res.status(200).json(result)
            } else {
                res.status(404).json({message: `${id} doesn't exists`})
            }
        }
    })
})

app.post('/users/add',(req,res) => {
    const username = req.body.username;
    const email = req.body.email;   
    const gender = req.body.gender;

    const insert_query = "INSERT INTO users (username,email,gender) VALUES (?, ?, ?);"
    connection.query(insert_query, [username, email, gender], (err,result) => {
        if(err) {
            res.status(400).json({message: err.sqlMessage})
        } else {
            res.status(200).json({message: `${result.affectedRows} user was added..!`})
        }
        console.log(result);
    })
})

app.delete('/users/deleteById/:id',(req,res) => {
    const id = req.params.id;

    const delete_query = "DELETE FROM users WHERE id = ?"
    connection.query(delete_query, id, (err,result) => {
        if(err) {
            res.status(400).json({message: err.sqlMessage})
        } else {
            if (result.affectedRows != 0) {
                res.status(200).json({message: `${result.affectedRows} user was deleted..!`})
            } else {
                res.status(404).json({message: `${id} doesn't exists`})
            }
        }
    })
})

app.patch("/users/updateById/:id", (req, res) => {
	const id = req.params.id;

	const select_byId = "SELECT * FROM users WHERE id = ?;"
	connection.query(select_byId, id, (err, result) => {
		if (err) {
			res.status(400).json({ message: err.sqlMessage })
		} else {
			if (result.length != 0) {
				const old_values = result[0]

				const updated_values = {...old_values, ...req.body}
				
				const values = [updated_values.username, updated_values.email, updated_values.gender, id]
				console.log(values);

				const update_query = "UPDATE users SET username = ?, email = ?, gender = ? WHERE id = ?"
				connection.query(update_query, values, (err, result) => {
					if (err) {
						res.status(400).json({message: err.sqlMessage})
					} else {
						if (result.changedRows != 0) {
							res.status(200).json({message: `${result.changedRows} users was updated..!`})
						} else {
							res.status(404).json({message: `${id} doesn't updated`})
						}
					}
					// consariole.log(result);
                    console.log(result);
					
				})
			} else {
				res.status(404).json({ message: `${id} doesn't exist` })
			}
		}
	})
})

app.listen(process.env.PORT, () => console.log("Server has Started..!"))

