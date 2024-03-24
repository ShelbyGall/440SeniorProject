const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// create an Express application
const app = express();
const port = process.env.PORT || 3000;

// Setup database connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

connection.connect(err => {
    if (err) {
        console.error('MySQL Connection Error: ', err.message);
        return;
    }
    console.log("MySQL Connection: Complete");
});


app.use(express.json()); // accept data in json format
app.use(express.urlencoded({ extended: true })); // decode the data sent through html form
app.use(express.static('public')); // this serves our 'public' folder as a static folder

// called when user submits their login info
app.post('/login', (req, res) =>{
    const {username, password} = req.body; // stores user's inputs inside 'username' & 'password'
    const query = "SELECT * FROM user WHERE username = ? AND password = ?"; // defines query with value placeholders called '?'

    // runs the query (passing 'username'/'password' values into it) & runs the callback function
    connection.query(query, [username, password], (error, results) => {
        if (results && results.length > 0){
            console.log("Login Successful: ", username);
            res.redirect('/home.html');
        } 
        else if (error) {
            console.log("\n=========================ERROR=========================")
            console.error("Error logging in user: ", error)
            console.log("==========================================================\n")
        }
        else {
            console.log("Login Attempt Failed")
            res.redirect('/index.html')
        }
    });
}); 

// called when user submits their registration info
app.post('/register', (req, res) => {
    const { email, username, password, confirm_password, firstName, lastName } = req.body; // stores user's registration info
    const query = "INSERT INTO user VALUES(?, ?, ?, ?, ?)"; // defines query with value placeholders called '?'

    // runs the query (passing the 5 argumemnts into it) & runs the callback function
    connection.query(query, [username, password, firstName, lastName, email], (error, results) => {
        if(error) {
            console.log("\n=========================ERROR=========================")
            console.error("Error inserting user: ", error)
            console.log("==========================================================\n")

            res.redirect("./register.html")
            // res.status(500).send("An error occured during registeration. Look at terminal!")
        } else {
            console.log("User registered successfully: ", username)
            res.redirect("/index.html")
        }
    });

});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});