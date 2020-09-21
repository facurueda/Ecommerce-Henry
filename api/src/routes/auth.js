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
    console.log(req.sessionID)
    res.send('funciona')
})

/////s63 ---> creo ruta de login 
server.post('/login', passport.authenticate('local', {
    // en el caso que se logee bien a donde enviamos?
    successRedirect: 'http://localhost:3000/auth/',
    failureRedirect: 'http://localhost:3000/auth/login',
    failureFlash: true,
    
}))




/////s64 ---> creo ruta de logout
server.post('/logout', (req, res) => {
    // req.logout(); //----> hace falta??
     // remove the session user id
    /* req.session.userId = null; */
    res.status(200).clearCookie('connect.sid', {
        path:'/'
    });
    req.session.destroy( err => {
        res.redirect('/')   
    });
});


/////s65 devuelve el usuario logeado ----> me parece que esta muy mal esto jaja y 
//no se si aca debe ser lo de la cookie?
server.get('/me', (req, res) => {
    // req.body.user?
    if (req.user.authenticated) {
        res.send(user)
    } else {
        redirect('/')
    }

})

/////s67 cambio el perfil a admin
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