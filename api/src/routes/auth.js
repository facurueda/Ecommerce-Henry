const server = require('express').Router();
const {
    User,
} = require('../db.js');
// const Sequelize = require("sequelize");
// const bcrypt = require('bcrypt')
// const cookieParser = require('cookie-parser')
const passport = require('passport');

const initializePassport = require('../passport-config');
initializePassport(passport, email => {
    passport,
    email => User.findOne({
        where: {
            email: email
        }
    })
})


server.get('/', (req, res, next) => {
    console.log('asdas')
    res.send('funciona')
})

server.post('/login', passport.authenticate('local', {

    // en el caso que se logee bien a donde enviamos?
    successRedirect: 'http://localhost:3000/auth/',
    failureRedirect: 'http://localhost:3000/auth/login',
    failureFlash: true,
}))



//////////////////////////////////////////////////////logout
//s64
server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
    // remove the session user id
    // req.session.userId = null;
});
//s65 devuelve el usuario logeado
server.get('/me', (req, res) => {
    // req.body.user?
    if (req.user.authenticated) {
        res.send(user)
    } else {
        redirect('/')
    }

})

//s67 cambio el perfil a admin
server.post('/promote/:id', (req, res) => {
    User.findOne({
        where: {
            idUser: req.body.id,
        }
    }).then(user => {
        user.update({
            ...user,
            level: Admin,
        })
    })
})

module.exports = server;