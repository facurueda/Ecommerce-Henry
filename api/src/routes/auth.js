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
const crypto = require('crypto');
const async = require("async");
const { token } = require('morgan');

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
    // ** -- DIRIGIR A PAGINA QUE PREGUNTE SI ESTA PERDIDO ** -- //
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

server.get('/testAuth', isUserOrAdmin, (req, res, next) => {
    res.send('funciona')
})

server.get('/', isUserOrAdmin, (req, res) => {
    res.send('funcionnnaaaaa!!')
})


server.get('/me', isUserOrAdmin, (req, res) => {
    User.findOne({
        where: {
            idUser: req.body.idUser
        }
    }).then(user => {
        res.send(user)
    })
})


/////////////////////////////////////////////////////////////////////////////////////////////// POST

server.post('/login', passport.authenticate('local', {
    session: true,
    successRedirect: 'http://localhost:3000/auth/',
    failureRedirect: 'http://localhost:3000/auth/login',
    failureFlash: true,
}))

server.post('/logout', (req, res) => {
    const {
        idUser,
        level
    } = req.body

    if (level === 'user' || level === 'admin') {
        res.status(200).clearCookie('connect.sid', {
            path: '/'
        });
        req.session.destroy(err => {
            res.redirect('/')
        });
    } else {
        Order.findOne({
            where: {
                idUser: idUser,
                status: 'CARRITO'
            }
        }).then(order => {
            return order.update({
                ...order,
                status: 'CANCELADA'
            })
        }).then(() => {
            res.send({
                result: 'Carrito vaciado'
            })
        })
        User.destroy({
            where: {
                idUser: idUser
            }
        }).then(() => {
            res.send({
                result: 'User eliminado'
            })
        })
        res.status(200).clearCookie('connect.sid', {
            path: '/'
        });
        req.session.destroy(err => {
            res.redirect('/')
        });
    }
});

/////s67 cambio el perfil a admin
server.post('/promote/:id', isAdmin, (req, res) => {
    User.findOne({
        where: {
            idUser: req.params.id,
        }
    }).then(user => {
        user.update({
            ...user,
            level: 'Admin',
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
    // Llega info del front, si idUser no existe o es 0 se cre el usuario GUEST con su Orden
    if (idUser == 0 || !idUser) {
        User.create({
            name: 'guest',
            email: aleatoryEmail + '@gmail.com',
            password: hashedPassword,
            level: 'GUEST'
        }).then((newUser) => {
            Order.create({
                idUser: newUser.idUser,
                status: 'CREADA'
            }).then(order => {
                carrito = order;
            })
            return newUser
        }).then((newUser) => {
            // status(401)
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
        console.log('yup')
        User.findOne({
            where: {
                idUser: idUser
            }
        }).then((user) => {
            userAux = user;
            Order.findOne({
                where: {
                    idUser: user.idUser
                }
            }).then(order => {
                res.send({
                    idUser: userAux.idUser,
                    name: userAux.name,
                    email: userAux.email,
                    level: userAux.level,
                    order
                })
            })
        })
    }
})




//////////////////////////////// password resset

server.post('/forgot',(req,res) => {   // funciona bien
    console.log(req.body)
   
    async.waterfall([   // creo un token 
         function(done) {
         crypto.randomBytes(20,function(err,buf){
         var token = buf.toString('hex');
         done(err,token)
            })
        },

        function(token,done){ // busco el usuario 
            User.findOne({
                where : {
                    email : req.body.email
                }
            }).then((user) => { 
                if(!user){  //404 enviarrr
                    req.flash('error', 'Not acount with that email adress exists.'); // so no existe tiro error
                    return res.redirect('/forgot')
                } 
                user.update({   //si el usuario existe actualizo las propiedades del modelo
                    ...user,
                    resetPasswordToken : token,  // le doy la contraseña 
                    resetPasswordExpires : Date.now() + 3600000 // y un tiempo de expiracion
                })                   
            })
        
        },

        function (token, user, done){
        const smtpTransport = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
        user: 'wellington.lindgren@ethereal.email',
        pass: 'K3Cy7ESQvGsUq58WFa'
        }
        });
            
            var mailOption = {
                to: user.email,
                from: 'Lacoseria',
                subject : 'Reset Password',
                text: 'You are reiciving this because you (or someone else) have requested the reset of the password. Please click on the following link, o blabla' +
               /*  'http://' + req.header.host + '/reset/' + token + '\n\n' +  */
                'If you didn´t requested this please ignore this email'
            };
            
            smtpTransport.sendMail(mailOption, function(err){
                console.log('mail send');
                req.flash('success', 'An e-mail has been send to ' + user.email + 'Whit further instructions');
                done(err, 'done');
            });
        }
    ], function(err){
        if(err) return next(err);
        res.redirect('/forgot');
    });
});



/* { Date.now() + 3600000 < new Date().getTime()/1000)} */
///////////////////////////////////Hasta aca-----> confirmo usuario le doy un token, date expire y le mando el mail
/* 
  server.get('reset', (req,res) => {  // busco el usuario segun los datos que le pase anteriormente
   console.log('token', req.query.token)
    User.findOne({
        where: {
            resetPasswordExpires : {$gt: Date.now()},
            resetPasswordToken : req.params.token
        }
    }).then((user) => {
        if(!user){
            req.flash('error','Password token resset is invalid has expired');
            return res.redirect('/forgot');
        }
        res.send({token : req.body.token})//esto iria?
    }).catch( req => { console.log('error')});
})  */


// escribo mi password and my confirm password
//async waterfall es una funcion que contiene un array de funciones secuenciales

server.post('reset', (req,res) => { // no lee el token
    console.log("token", req.params.token);
    async.waterfall([ 
        function(done){
            User.findOne({
                where: {
                    resetPasswordExpires : { $gt: Date.now()}, // facuu --->como se remplaza aca para sql?
                    resetPasswordToken : req.params.token
                }
            }), function(err,user){
                if(!user){
                    req.flash('error','Password token resset is invalid has expired');
                    return res.redirect('/forgot');
                }
                 else {
                    user.update({...user,
                        password : req.body.password,   //seteo la password
                        resetPasswordExpires : undefined,
                        resetPasswordToken : undefined 
                    }) /// savee-----
                    
                }
            }, function(err){
                req.flash('error', 'Password do not match');
                res.send.status(404);
                return res.redirect('/forgot');
                
            }
        } 
        
    ])
})


//despues tengo que volver a hacer un transport email y mandar que ya se cambio su contraseña

/* function(user, done) {
    var smtpTransport = nodemailer.createTransport({
      service: 'Gmail', 
      auth: {
        user: 'learntocodeinfo@gmail.com',
        pass: process.env.GMAILPW
      }
    });
    var mailOptions = {
      to: user.email,
      from: 'Lacoseria@mail.com',
      subject: 'Your password has been changed',
      text: 'Hello,\n\n' +
        'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
    };
    smtpTransport.sendMail(mailOptions, function(err) {
      req.flash('success', 'Success! Your password has been changed.');
      done(err);
    });
  }
], function(err) {
  res.redirect('/home');
});
}); */

module.exports = server;