const Sequelize = require('sequelize');

function db() {
  return new Sequelize('postgres://henry:soyhenry@localhost/development', {
    logging: false, // set to console.log to see the raw SQL queries
    native: true, // lets Sequelize know we can use pg-native for ~30% more speed
  });
}

module.exports = db;
