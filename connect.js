const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');



function inputValidation(inputs) {
    const invalidChar = new Set(['--','=',';','"',"'",',']) 

    for (let k = 0; k < inputs.length; k++)
        for (let i = 0; i < inputs[k].length; i++) 
            if (invalidChar.has(inputs[k][i]))
                return false
 
    return true
}



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

    if (inputValidation([username, password])) {
        // runs the query (passing 'username'/'password' values into it) & runs the callback function
        connection.execute(query, [username, password], (error, results) => {
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
    }
    else {
        console.log("Malicious Input detected - input aborted")
        res.redirect('/index.html')
    }
}); 

// called when user submits their registration info
app.post('/register', (req, res) => {
    const { email, username, password, confirm_password, firstName, lastName } = req.body; // stores user's registration info
    const query = "INSERT INTO user VALUES(?, ?, ?, ?, ?)"; // defines query with value placeholders called '?'

    if (password === confirm_password && inputValidation([email, username, password, firstName, lastName])){
        // runs the query (passing the 5 argumemnts into it) & runs the callback function
        connection.execute(query, [username, password, firstName, lastName, email], (error, results) => {
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
    }
    else {
        if (!(password === confirm_password)) {
            console.log("Passwords dont match")
            res.redirect("./register.html")
        }
        else { 
            console.log("Malicious Input detected - input aborted")
            res.redirect("./register.html")
        }
    }
});


app.post('/post-item', (req, res) => {
    const {title, description, category, postDate, username, price} = req.body
    const validPostQuery = "SELECT count(*) FROM item WHERE username LIKE ? AND postDate LIKE ?";
    const inputs = [title, description, category, postDate, username, price]
    console.log([username, postDate])
    if (inputValidation(inputs)) {
        connection.execute(validPostQuery, [username, postDate], (error, results) => {
            if(error) {
                console.log("\n=========================ERROR=========================")
                console.error("Error checking number of items: ", error)
                console.log("==========================================================\n")

                res.redirect("./home.html")
            } else {
                console.log(results[0]["count(*)"])
                if (results[0]["count(*)"] < 2) {
                    let insertItemQuery = "INSERT INTO item (title, descr, category, postDate, username, price) VALUES(?,?,?,?,?,?)"
                    connection.execute(insertItemQuery, inputs, (error, results) => {
                        if (error) {
                            console.log("\n=========================ERROR=========================")
                            console.error("Error inserting item: ", error)
                            console.log("==========================================================\n")
                        } else {
                            console.log("item entered successfully")
                        }
                    })
                }
                else {
                    console.log("cannot insert item, reached item addition limit for the day")
                }
            }
        })
    } else {
        console.log("invalid inputs")
    }
    res.redirect("./home.html")
});


app.get('/search-items', (req, res) => {
    const categoryToSearch = req.query.category; // Accessing the category sent by the form
    
    // SQL query to select items from the 'item' table where the 'category' matches the search
    const searchQuery = `SELECT * FROM item WHERE category = ?`;
  
    connection.execute(searchQuery, [categoryToSearch], (error, results) => {
      if (error) {
        console.error("Search Error:", error);
        res.status(500).send("An error occurred during the search.");
      } else {
        // send back the results as JSON
        res.json(results);
      }
    });
  });  


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});