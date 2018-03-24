// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
const Library = require("../models/book");


// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", (req, res) => res.render('view'));

  // add route loads the add.html page, where users can enter new books to the db
  app.get("/add", (req, res) => res.render('add'));

  // all route loads the all.html page, where all books in the db are displayed
  app.get("/all", (req, res) => 
      Library.findAll({})
        .then(results => res.render('result-list',{description: "All Books", books: results})));

  // short route loads the short.html page, where short books in the db are displayed
  app.get("/short", (req, res) => 
      Library.findAll({ where: { pages: { $lte: 150 }}, order: [["pages", "ASC"]]})
        .then(results => res.render('result-list', {description: "Short Books", books: results})));


  // long route loads the long.html page, where long books in the db are displayed
  app.get("/long", (req, res) => 
      Library.findAll({ where: { pages: { $gte: 150 }}, order: [["pages", "DESC"]]})
        .then(results => res.render('result-list',{description: "Long Books", books: results})));

};
