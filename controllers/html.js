// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });


  app.get("/lvl/:id", isAuthenticated, function(req, res) {
    switch (req.params.id) {
      case "0":
        res.sendFile(path.join(__dirname, "../public/play.html"));
        break;
      case "1":
        res.sendFile(path.join(__dirname, "../public/01game_crystal.html"));
        break;
      case "2":
        res.sendFile(path.join(__dirname, "../public/02game_trivia.html"));
        break;
      case "3":
        res.sendFile(path.join(__dirname, "../public/03game_hangman.html"));
        break;
      case "4":
        res.sendFile(path.join(__dirname, "../public/04game_fight.html"));
        break;
      default:
        res.sendFile(path.join(__dirname, "../public/play.html"));
    }
  });

  //Dawn - putting in the index.html file for the user to be able to play.
  //Make sure we integrate with the if the user is logged in authentication functionality
  app.get("/play", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/play.html"));
  });

};