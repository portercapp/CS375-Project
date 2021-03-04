const express = require('express');
const app = express();

const port = 3000;
const hostname = "localhost";

app.use(express.json());
app.use(express.static('src'));

//We can use this for testing when we implement the requests on the Frontend
app.get('/test', (req, res) => {
	res.send("Test Message");
});

app.listen(port, hostname, () => {
	console.log(`Listening at: http://${hostname}:${port}`);
});