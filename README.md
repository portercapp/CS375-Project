# Greenscreen App

### First, set up the database:

1. Run `psql --username postgres` and log in.

2. Run the SQL query: `CREATE DATABASE sloth;`

3. Run the command `\c sloth`

4. Finally, run the following Postgres command to create the table:


    CREATE TABLE backgrounds (
        id SERIAL PRIMARY KEY,
        title VARCHAR(50),
        image_name VARCHAR(100)
    );

5. Edit the `env.json` file inside `greenscreen-project-node` and
replace the `password` field with your Postgres password.


### To start the server:

To run the server, use the command `node server.js` inside the main
`app` folder.

