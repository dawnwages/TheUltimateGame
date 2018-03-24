// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
const Library = require("../models/book");

// Routes
// =============================================================
module.exports = app => {
  // Get all books
  app.get("/api/all", (req, res) => Library.findAll({}).then(results => res.json(results)));

  // Get a specific book
  app.get("/api/:book", (req, res) => {
      if (req.params.book) {
        Library.findAll({ where: { title: req.params.book }})
          .then(results => res.json(results));
      }
  });

  // Get all books of a specific genre
  app.get("/api/genre/:genre", (req, res) => {
      if (req.params.genre) {
        Library.findAll({ where: { genre: req.params.genre }})
          .then(results => res.json(results));
      }
  });

  // Get all books from a specific author
  app.get("/api/author/:author", (req, res) => {
      if (req.params.author) {
          Library.findAll({ where: { author: req.params.author }})
            .then(results => res.json(results));
      }
  });

  // Get all "long" books (books 150 pages or more)
  app.get("/api/books/long", (req, res) => 
      Library.findAll({ where: { pages: { $gte: 150 }}, order: [["pages", "DESC"]]})
        .then(results => res.json(results)));

  // Get all "short" books (books 150 pages or less)
  app.get("/api/books/short", (req, res) => 
      Library.findAll({ where: { pages: { $lte: 150 }}, order: [["pages", "ASC"]]})
        .then(results => res.json(results)));

  // Add a book
  app.post("/api/new", (req, res) => {
      console.log("Book Data:");
      console.log(req.body);
      Library.create({
          title: req.body.title,
          author: req.body.author,
          genre: req.body.genre,
          pages: req.body.pages
      }).then(book => res.json(book));
  });

  // Delete a book
  app.post("/api/delete", (req, res) => {
      console.log("Book Data:");
      console.log(req.body);
      Library.destroy({ where: { id: req.body.id }})
        .then(num => res.json({count: num}));
  });
};
