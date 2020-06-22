const server = require('express').Router();

server.post('/changepassword');

server.post('/login');

server.get('/logout');

server.post('/register');

server.get('/me');

server.put('/promote');

module.exports = server;
