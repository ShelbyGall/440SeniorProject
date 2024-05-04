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

// search for items
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
  

// submit review for an item
app.post('/post-review', (req, res) => {
    const { itemId, username, rating, reviewText } = req.body;

    const existingReviewCheck = `SELECT * FROM reviews WHERE username = ? AND itemID = ?`;
    connection.execute(existingReviewCheck, [username, itemId], (reviewCheckErr, reviewCheckResults) => {
        if (reviewCheckErr) {
            console.error("Error checking for existing review:", reviewCheckErr);
            return;
        }

        // if user has already reviewed the selected item
        if (reviewCheckResults.length > 0) {
            console.log("This item has already been reviewed by user:", username);
            res.redirect("./home.html")
            return;
        }

        const itemOwnershipQuery = `SELECT username FROM item WHERE itemID = ?`;
        connection.execute(itemOwnershipQuery, [itemId], (ownershipError, ownershipResults) => {
            if (ownershipError) {
                console.error("Error checking item ownership:", ownershipError);
                res.redirect("./home.html")
                return;
            }

            // if the user is trying to review their own item
            if (ownershipResults.length > 0 && ownershipResults[0].username === username) {
                console.log(username, "is not allowed to review their own item!");
                res.redirect("./home.html")
                return;
            }

            const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD format
            const reviewLimitQuery = `SELECT COUNT(*) AS count FROM reviews WHERE username = ? AND revDate = ?`;
            connection.execute(reviewLimitQuery, [username, today], (error, results) => {
                if (error) {
                    console.error("Error checking review limits:", error);
                    res.redirect("./home.html")
                    return;
                }

                // if the user has reached their review limit
                if (results[0].count >= 3) {
                    console.log("Daily Review Limit Reached for User:", username);
                    res.redirect("./home.html")
                    return;
                }

                // If the review limit is not reached, proceed to insert the new review
                const insertReviewQuery = `INSERT INTO reviews (rating, text, username, revDate, itemID) VALUES (?, ?, ?, ?, ?)`;
                connection.execute(insertReviewQuery, [rating, reviewText, username, today, itemId], (insertError) => {
                    if (insertError) {
                        console.error("Error inserting review:", insertError);
                        res.redirect("./home.html")
                        return;
                    }
                    console.log("Review Successfully Posted by User:", username);
                    res.redirect("./home.html")
                });
            });
        });
    });
});

  
// get reviews for an item
app.get('/get-reviews', (req, res) => {
    const { itemId } = req.query;
  
    const getReviewsQuery = "SELECT * FROM reviews WHERE itemID = ?";
    connection.execute(getReviewsQuery, [itemId], (error, results) => {
      if (error) {
        console.error("Error fetching reviews:", error);
        return res.status(500).send("An error occurred fetching reviews.");
      }
  
      res.json(results);
    });
});


function getQuery(qid) {
    if (qid == "query1")
      return 'select title, category, price  from item  where price in (select max(price)  from item  group by category)'
    else if (qid == "query2")
      return "SELECT i.itemID, i.title, i.descr FROM item i JOIN reviews r ON i.itemID = r.itemID WHERE i.username = ? GROUP BY i.itemID, i.title, i.descr HAVING COUNT(*) = SUM(r.rating IN ('Excellent', 'Good'))"
    else if (qid == "query3")
      return "select username, count(username) as 'Number of Items'  from item as i  where postDate = '2024-04-15'  group by username  having count(username) = (select count(username) from item where postDate = '2024-04-15' group by username order by count(username) desc limit 1)"
    else if (qid == "query4")
      return 'SELECT f1.favorite_username  FROM favorites f1  JOIN favorites f2 ON f1.favorite_username = f2.favorite_username  WHERE f1.user_username = ? AND f2.user_username = ? AND f1.user_username != f2.user_username;'
    else if (qid == "query5")
      return 'select username  from user where username not in ( select distinct username from item as i where 3 <= ( select count(r.itemID) from reviews as r where i.itemID = r.itemID and r.rating = "excellent" ))'
    else if (qid == "query6")
      return 'select username  from reviews as r  group by username  having count(username) = (select count(username)  from reviews  where r.username = username and rating = "poor")'
}

app.get('/query', (req, res) => {
    let {userIn, qid} = req.query
    let queryPrompt = getQuery(qid)
    userIn = userIn.split(",")
    console.log(`userIn: ${userIn}`)
    console.log(`qid: ${qid}`)

    connection.execute(queryPrompt, userIn, (error, results) => {
        if (error) {
          console.error("Error fetching query:", error);
          return res.status(500).send("An error occurred performing query.");
        }
        
        console.log(results)
        res.json(results);
      });
}) 


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});