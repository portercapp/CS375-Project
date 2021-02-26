const express = require('express');
const app = express();


const port = 3000;
const hostname = "localhost";

app.use(express.static('src'));

app.get('*', (req, res) => {
	res.sendFile("src/index.html");
});

app.listen(port, hostname, () => {
	console.log(`Listening at: http://${hostname}:${port}`);
});