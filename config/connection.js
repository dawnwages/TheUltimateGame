// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL
// *********************************************************************************

// Dependencies
const Sequelize = require("sequelize");

// Exports a new connection for other files to use
module.exports = new Sequelize("sequelize_library", "bootcamp", "Passw0rd", {
    host: "localhost",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
});
