const server = require('express').Router();
const {
    User,
    Order
} = require('../db.js');
const passport = require('passport');
const bcrypt = require('bcrypt')
const aleatoryNumber = () => {
    return Date.now() + Math.random()
}
const nodemailer = require('nodemailer');
const { session } = require('passport');

/////////////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS TO SECURITY ROUTES

function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.level === 'admin') {
            console.log('this user is ADMIN')
            return next()
        }
        console.log('this user DOESNT ADMIN')
    }
    console.log('THIS USER NOT AUTHENTICATED')
    res.redirect('/')
}

function isUserOrAdmin(req, res, next) {

    if (req.isAuthenticated()) {
        if (req.user.level === 'user' || req.user.level === 'admin') {
            console.log('el usuario esta logeado')
            return next()
        }
        console.log('this user is GUEST')
    }
    console.log('THIS USER NOT AUTHENTICATED')
    res.redirect('htpp://localhost:3000/auth/login')
}

/////////////////////////////////////////////////////////////////////////////////////////////// GET

server.get('/me', isUserOrAdmin, (req, res) => {
    User.findOne({
        where: {
            idUser: req.user.idUser
        }
    }).then(user => {
        const response = {
            ...user,
            dataValues: {
                ...user.dataValues,
                verified: true
            }
        }
        res.send(response)
    })
})

/////////////////////////////////////////////////////////////////////////////////////////////// POST

server.post('/login', passport.authenticate('local', {
    session: true,
    successRedirect: 'http://localhost:3000/auth/me',
    failureRedirect: 'http://localhost:3000/auth/testAuth',
    failureFlash: true,
}))

server.post('/login', (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        const userValues = {
            ...user.dataValues,
            verified: true
        }
        res.send(userValues)
    })
})

server.post('/logout', (req, res) => {
    req.logOut()
    res.clearCookie('connect.sid');
    req.session.destroy()
});

// To set user to Admin
server.put('/promote/:id', (req, res) => {
    User.findOne({
        where: {
            idUser: req.params.id,
        }
    }).then(user => {
        user.update({
            ...user,
            level: 'admin',
        })
    })
})
// To set user to Admin
server.put('/degrade/:id', (req, res) => {
    User.findOne({
        where: {
            idUser: req.params.id,
        }
    }).then(user => {
        user.update({
            ...user,
            level: 'user',
        })
    })
})

server.post('/cookie', async (req, res) => {
    const {
        idUser
    } = req.body
    let aleatoryEmail = aleatoryNumber();
    const hashedPassword = await bcrypt.hash('guest', 10)
    let carrito = null;
    let userAux = null;

    if (idUser == 0 || !idUser) {
        User.create({
            name: 'guest',
            email: aleatoryEmail + '@gmail.com',
            password: hashedPassword,
            level: 'GUEST'
        }).then((newUser) => {
            return Order.create({
                idUser: newUser.idUser,
                status: 'CREADA'
            }).then(order => {
                carrito = order;
            }).then(() => {
                return newUser
            })
        }).then((newUser) => {
            res.send({
                idUser: newUser.idUser,
                name: newUser.name,
                email: newUser.email,
                level: newUser.level,
                verified: true,
                order: carrito
            })
        })
    } else {
        console.log('idUserTHIS', idUser)
        User.findOne({
            where: {
                idUser: idUser
            }
        }).then((user) => {
            userAux = user;
            console.log('este no reconoce', user)
            return Order.findOne({
                where: {
                    idUser: idUser
                }
            })
        }).then(order => {
            res.send({
                idUser: userAux.idUser,
                name: userAux.name,
                email: userAux.email,
                level: userAux.level,
                order
            })
        }).catch(error => {
            console.log('there was an error', error);
            res.status(404);
        })
    }
})

//////////////////////////////// password resset

let token = Math.floor((Math.random() * 1000000) + 1);

server.post('/forgot', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then((user) => {
        if (!user) {
            req.flash('error', 'Not acount with that email adress exists.');
            res.status(404);
            return res.redirect('/forgot')
        }
        user.update({
            ...user,
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000
        }).then(() => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'noreplylacoseria@gmail.com',
                    pass: 'ohqrgkrmeqhcamil'
                }
            });
            const linkReset = 'http://localhost:3001/auth/reset/?token=' + token
            const mailOptions = {
                from: 'noreplylacoseria@gmail.com',
                to: req.body.email,
                subject: 'Cambio de contraseña',
                html: `El link para resetear tu constraseña es: <a href= ${linkReset}> LINK </a>`
            };
            transporter.sendMail(mailOptions);
        })
    })

})
server.post('/reset', (req, res) => {
    User.findOne({
        where: {
            resetPasswordToken: req.query.token
        }
    }).then(async (user) => {
        if (!user) {
            req.flash('error', 'Sorry, we can´t find you?');
            res.redirect('/auth/forgot');
        } else {
            const hasshed = await bcrypt.hash(req.body.password, 10)
            if (user.resetPasswordExpires > Date.now()) {
                user.update({
                    ...user,
                    password: hasshed,
                    resetPasswordExpires: null,
                    resetPasswordToken: null,
                }).then(() => {
                    res.send({
                        result: 'usuario actualizado'
                    })
                })
            }
        }
    }).catch((err) => {
        req.flash('Password token reset has expired');
        res.status(404);
    })
})


// GOOGLE STRATEGY

server.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

server.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:3001/',
        failureRedirect: '/login'
        // Ver como hacer para que el FRONT ejecute la un dipatch /me y modifique los datos de su cookie
    }),
);





module.exports = server;