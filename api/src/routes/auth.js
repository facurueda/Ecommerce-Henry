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

const crypto = require('crypto');
const async = require("async");



/////////////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS TO SECURITY ROUTES

function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.level === 'admin') {
            console.log('this user is ADMIN')
            return next()
        } console.log('this user DOESNT ADMIN')
    }
    console.log('THIS USER NOT AUTHENTICATED')
    // -- DIRIGIR A PAGINA QUE PREGUNTE SI ESTA PERDIDO -- //
    res.redirect('/')
}

function isUserOrAdmin(req, res, next) {

    console.log('1234', req.isAuthenticated())

    if (req.isAuthenticated()) {
        if (req.user.level === 'user' || req.user.level === 'admin') {
            console.log('el usuario esta logeado')
            return next()
        } console.log('this user is GUEST')
    }
    console.log('THIS USER NOT AUTHENTICATED')
    res.redirect('htpp://localhost:3000/auth/login')
}


/////////////////////////////////////////////////////////////////////////////////////////////// GET

server.get('/testAuth', (req, res, next) => {
    console.log(req.user)
    res.send('funciona')
})

server.get('/', (req, res) => {
    res.send('funcionnnaaaaa!!')
})


server.get('/me', isUserOrAdmin, (req, res) => {

    User.findOne({
        where: {
            idUser: req.user.idUser
        }
    }).then(user => {
        // console.log('USER TO SEND FRONT', user)

    //     return user.update({
    //         ...user,
    //         verified: true
    //     }) 
    // }).then((response) => {
    //     console.log('asdasdasdasd', response)
    //     res.send( response )
    // })   
        const cualquiercosa = {
            ...user,
            dataValues: {
                ...user.dataValues,
                verified: true
            }
        }
        res.send( cualquiercosa )
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
        const userValues = {...user.dataValues,verified: true}
        console.log(userValues)
        res.send(userValues)
    })
})
server.post('/logout', (req, res) => {
    // const {
    //     idUser,
    //     level
    // } = req.body

    // if (level === 'user' || level === 'admin') {
    //     res.status(200).clearCookie('connect.sid', {
    //         path: '/'
    //     });
    //     req.session.destroy(err => {
    //         res.redirect('/')
    //     });
    // } else {
    //     Order.findOne({
    //         where: {
    //             idUser: idUser,
    //             status: 'CARRITO'
    //         }
    //     }).then(order => {
    //         return order.update({
    //             ...order,
    //             status: 'CANCELADA'
    //         })
    //     }).then(() => {
    //         res.send({
    //             result: 'Carrito vaciado'
    //         })
    //     })
    //     User.destroy({
    //         where: {
    //             idUser: idUser
    //         }
    //     }).then(() => {
    //         res.send({
    //             result: 'User eliminado'
    //         })
    //     })
    //     res.status(200).clearCookie('connect.sid', {
    //         path: '/'
    //     });
    //     req.session.destroy(err => {
    //         res.redirect('/')
    //     });
    // }
    res.sendStatus(200)
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
const toLog = ((type, cmd) => {
    console.log('\n' + type + ': \n', cmd)
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
            return Order.create({
                idUser: newUser.idUser,
                status: 'CREADA'
            }).then(order => {
                carrito = order;
            }).then(() => {
                return newUser
            })
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
        User.findOne({
            where: {
                idUser: idUser
            }
        }).then((user) => {
            userAux = user;
            return Order.findOne({
                where: {
                    idUser: user.idUser
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
        })
    }
})

//////////////////////////////// password resset

server.post('/forgot', (req, res) => {   // funciona bien
    console.log(req.body);

    async.waterfall([   // creo un token 
        function (done) {
            crypto.randomBytes(20, function (err, buf) {
                var token = buf.toString('hex');
                done(err, token)
            })
        },

        function (token, done) { // busco el usuario 
            User.findOne({
                where: {
                    email: req.body.email
                }
            }).then((user) => {
                if (!user) {  //404 enviarrr
                    req.flash('error', 'Not acount with that email adress exists.');
                    res.status.send(404); // so no existe tiro error
                    return res.redirect('/forgot')
                }
                user.update({   //si el usuario existe actualizo las propiedades del modelo
                    ...user,
                    resetPasswordToken: token,  // le doy la contraseña 
                    resetPasswordExpires: Date.now() + 3600000 // y un tiempo de expiracion
                })
            })
        }        
    ])
});



server.post('/reset/:token', (req, res) => {
    //2020-09-24 22:17:40 ---> date from database 
    //24 2020 22:14:07 GMT-0300 to string
    //http://localhost:3000/auth/reset/470f2082ddc414d51db94c686833c6e17b737d22
    console.log("token", req.params.token);
    User.findOne({
        where: {
            resetPasswordToken: req.params.token
        }
    }).then((user) => {
        console.log('1')
        if (!user) {
            req.flash('error', 'Sorry, we can´t find you?');
            res.redirect('/forgot');
        } else {
            console.log(user);
            if (user.resetPasswordExpires > Date.now()) {
                console.log('entro')
                user.update({
                    ...user,
                    password: req.body.password,
                    resetPasswordExpires: null,
                    resetPasswordToken: null,
                })
                res.status(200);
            }
        }
    })
    .catch((err) => {
        console.log('3');
        req.flash('Password token reset has expired');
        res.status(404);
    })
})


server.get('/sendemail', (req,res) =>{
    const email = req.body.email;
    /* const message = req.body.message; */
    console.log(req.body.email)
    sendEmail(email);
   
    
const transporter = nodemailer.createTransport({
  /*   host: 'smtp.ethereal.email', */
 /*    port: 587,
    secure: false, */
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});
//we create JSON object which will define the email structure
function sendEmail(email, message, res, next) {
    const mailOptions = {
      from: `noreplylacoseria@gmail.com`,
      to: email,
      subject: `Nodemailer test`,
      text: /* n\n' +
             req.body.me req.body.name + '\n' +
             req.body.email + '\ssage,   */   
             'that is simply'
    };
   
   transporter.sendMail(mailOptions, (err, info) => {
      if (err){
          return console.log(err)
      } else {   
      res.status(200).json({
        message: 'Email sent'
      })};
   });
   }
})

module.exports = server;