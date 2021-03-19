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

### Greenscreen Images:

In regards to uploaded profile pictures, there are provided images that one can use as tests. These images have a certain shade of green that works best with our app. For best cases, use other images with the same shade of green as their backgrounds. Other shades of green might not work as well, needing to alter the rgb value in the code to better fit them.
