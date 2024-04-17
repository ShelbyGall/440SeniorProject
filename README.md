Authors:
    Daniel Barlam
    Shelby Gallegos
    Rishabh Chadha

Installation:
    Node.js     Install through browser
    express.js  npm install express
    dotenv      npm install dotenv
    mysql2      npm install mysql2
    
Run:
    1.
        To run, congfigure your .env file to have the correct fields
        for connecting to MySQL and your local database
        DB_HOST = HOST
        DB_PORT = MYSQL PORT
        DB_USER = ROOT
        DB_PASSWORD = MYSQL WORKBENCH PASS
        DB_NAME = DATABASE NAME

    2.
        once you are connected to mysql, go to mysql workbench and run the 2 sql files in this order
            schema.sql
            inserts.sql
    
    3.
        Then navigate to the root directory of the project and run this command in the terminal
            node connect.js

    4.
        copy the link in the terminal in your browser and explore the website

YOUTUBE Phase 1 DEMO: https://www.youtube.com/watch?v=zhiK6x5Fm04
YOUTUBE Phase 2 DEMO: 