// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.findOne({
      where: {
        email: req.body.email
      }
    }).then(function (user) {
      if (user) {
        res.statusMessage = "Email already in use. Please use another, or log in below.";
        res.status(400).end();
      } else {
        db.User.create({
          email: req.body.email,
          password: req.body.password
        }).then(function () {
          res.redirect(307, "/api/login");
        }).catch(function (err) {
          console.log(err);
          res.json(err);
          // res.status(422).json(err.errors[0].message);
        });
      }
    })
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  //returns all characters by passing a user's id
  app.get("/api/character_of_user/:id", function (req, res) {
    db.Character.findAll({
      where: {
        UserId: req.params.id
      }
    }).then(function (results) {
      if (results.length === 0) {
        res.json(null);
      } else {
        res.json(results);
      }
    });
  });

  //retrieves character info by id
  app.get("/api/character/:id", function (req, res) {
    db.Character.findAll({
      where: {
        id: req.params.id
      }
    }).then(function (results) {
      if (results.length === 0) {
        res.json(null);
      } else {
        res.json(results);
      }
    });
  });

  //retrieves pets of user by id
  app.get("/api/pets_of_user/:id", function (req, res) {
    db.Pet.findAll({
      where: {
        CharacterId: req.params.id
      }
    }).then(function (results) {
      if (results.length === 0) {
        res.json(null);
      } else {
        res.json(results);
      }
    });
  });

  //creates character
  app.post("/api/character", function (req, res) {
    db.Character.create({
      char_name: req.body.char_name,
      hp: req.body.hp,
      attack: req.body.attack,
      coins: req.body.coins,
      lvl_comp: req.body.lvl_comp,
      sprite: req.body.sprite,
      UserId: req.body.UserId
    }).then(function (results) {
      res.json(results);
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  })

  //creates pet
  app.post("/api/pet", function (req, res) {
    db.Pet.create({
      pet_name: req.body.pet_name,
      CharacterId: req.body.CharacterId
    }).then(function (results) {
      res.json(results);
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  })

  //updates character's coins
  app.put("/api/character/coins", function (req, res) {
    db.Character.update({
      coins: req.body.coins
    },{
        where: {
          id: req.body.id
        }
      }).then(function (results) {
      res.json(results);
    }).catch(function (err) {
      console.log(err);
      res.json(err);
    });
  })

  //updates character's hp
  app.put("/api/character/hp", function (req, res) {
    db.Character.update({
      hp: req.body.hp
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (results) {
        res.json(results);
      }).catch(function (err) {
        console.log(err);
        res.json(err);
      });
  })

  //updates character's attack
  app.put("/api/character/attack", function (req, res) {
    db.Character.update({
      attack: req.body.attack
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (results) {
        res.json(results);
      }).catch(function (err) {
        console.log(err);
        res.json(err);
      });
  })

  //updates character's level complete value
  app.put("/api/character/lvl_comp", function (req, res) {
    db.Character.update({
      lvl_comp: req.body.lvl_comp
    }, {
        where: {
          id: req.body.id
        }
      }).then(function (results) {
        res.json(results);
      }).catch(function (err) {
        console.log(err);
        res.json(err);
      });
  })

};