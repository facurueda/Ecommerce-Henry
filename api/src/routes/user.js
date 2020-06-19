const { User } = require('models/index.js');
const server = require('express').Router();

server.get('/', (req, res, next) => {
  User.findAll()
    .then((users) => res.send(users))
    .catch(next);
});


module.exports = server;
