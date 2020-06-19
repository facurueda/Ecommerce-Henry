const { User } = require('models/index.js');
const auth = require('controllers/auth');
const server = require('express').Router();

server.post('/activate/:token', (req, res, next) => {
  const {
    email, password, name, lastname, dni,
  } = req.body;
  User.activateUser(email, req.params.token, password, name, lastname, dni)
    .then((activatedUser) => {
      if (!activatedUser) return next(badRequest());
      return res.send(activatedUser);
    }).catch(next);
});

server.post('/changepassword', (req, res, next) => {
  User.changePassword(req.body.email, req.body.oldPassword, req.body.newPassword)
    .then((changedUser) => {
      res.send(changedUser);
    })
    .catch((err) => {
      if (err.code === 400) return next(badRequest(null, err.message));
      return next(err);
    });
});

server.post('/login',
  auth.authHandler,
  (req, res) => res.send(req.user));

server.get('/logout', auth.logout, (req, res) => res.send(ok()));

server.post('/register', (req, res, next) => {
  User.create({
    email: req.body.email,
  })
    .then((newUser) => {
      newUser.createToken();
      res.send(newUser);
    })
    .catch(next);
});

server.get('/me', (req, res) => res.sendStatus(200));


server.put('/promote', (req, res) => {
  User.update({ accessLevel: req.body.accessLevel }, { where: { id: req.body.id } })
    .then(() => res.send());
});

module.exports = server;
