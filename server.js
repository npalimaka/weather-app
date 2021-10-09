// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
app.get('/recent', (req, res) => res.send(projectData))

app.post('/add', (req, res) => {
    const incomingData = req.body;
    const newEntry = {
        date: incomingData.date,
        temperature: incomingData.temperature,
        userResponse: incomingData.userResponse
    };
    projectData = {...newEntry};
    console.log(`post send with data ${req.body}`);
});

const port = 3000;
function listening() {
    console.log(`Listening on port: ${port}`)
}

app.listen(port, 'localhost', listening);