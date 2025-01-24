const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequalize = require('./backend/db');
const UserRoute = require('./routes/UserRoute'); // Correct import

// Creating a server
const app = express();

// Creating a port
const PORT = 5000;

// Creating a middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("your partners");
});
app.get('/ourpartners', (req, res) => {
    res.send("your partners");
});

// Use the correct variable name for the routes
app.use('/user', UserRoute);

// Running on port
app.listen(PORT, () => {
    console.log(`Server Running on ..................PORT ${PORT}`);
});

// Connect to the database server