// *********************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
// *********************************************************************************

// Dependencies
// =============================================================
const express = require("express");
const bodyParser = require("body-parser");
const bars = require("express-handlebars");

// Sets up the Express App
// =============================================================
const app = express();

app.engine('hbs', bars({defaultLayout: 'main', extname: 'hbs'}));
app.set('view engine','hbs');

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
const apiController = require("./controllers/api");
const htmlController = require("./controllers/html");

// Set up the controllers with our express app
apiController(app);
htmlController(app);

// Starts the server to begin listening
// =============================================================
const PORT = process.env.PORT || process.argv[2] || 8080;
app.listen(PORT, () =>  console.log("App listening on PORT " + PORT));
