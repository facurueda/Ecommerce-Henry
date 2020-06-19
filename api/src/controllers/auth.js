const { User } = require('models/index.js');
const Redis = require('ioredis');
const jwt = require('jsonwebtoken');

const redis = new Redis({
  port: 6379, // Redis port
  host: '127.0.0.1', // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  db: 0,
});

function authSuccess(req, res, next, user) {
  const data = {
    id: user.id,
    ip: req.connection.remoteAddress,
  };
  const token = jwt.sign(data, 'shhhhh');
  return redis.set(token, JSON.stringify(data))
    .then(() => {
      console.log('ok');
      req.user = user;
      res.status(200);
      res.cookie('authorization', token);
      return next();
    }).catch(next);
}
// show fail page (login)
function authFail(res, error) {
  res.status(401);
  res.clearCookie('authorization');
  res.type('application/json')
  if (!error) return res.send();
  return res.send(error);
}
// Login
function authHandler(req, res, next) {
  if (!req.body.email || !req.body.password) return authFail(res);
  return User.authenticate(req.body.email, req.body.password)
    .then((reply) => {
      // Add Expose Library
      if (reply) return authSuccess(req, res, next, reply);
      return authFail(res);
    }).catch((err) => authFail(res, err.message));
}

// for subsequents requests
function validateCookie(req, res, next) {
  const cookie = req.cookies.authorization || null;
  redis.get(cookie)
    .then(JSON.parse)
    .then((resp) => {
      if (!resp) return authFail(res);
      req.user = resp.user;
      return next();
    }).catch(next);
}

// Logout
function logout(req, res) {
  // invalidate the token
  const cookie = req.cookies.authorization ? req.cookies.authorization : null;
  redis.del(cookie)
    .then(() => {
      res.clearCookie('authorization');
      return res.send({ message: 'Succesfully logout.' });
    });
}

function isAdmin(req, res, next) {
  return req.user.accessLevel === 2 ? next() : next(forbidden());
}

function addSocketIdtoSession(req, res, next) {
  req.socketId = req.query.socketId;
  return next();
}

module.exports = {
  authHandler,
  logout,
  validateCookie,
  isAdmin,
  addSocketIdtoSession,
};
