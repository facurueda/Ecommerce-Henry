const server = require('express').Router();
const {
    User,
    Order
} = require('../db.js');
// const Sequelize = require("sequelize");
// const bcrypt = require('bcrypt')
// const cookieParser = require('cookie-parser')
const passport = require('passport');
const bcrypt = require('bcrypt')

// const initializePassport = require('../passport-config');
// initializePassport(passport, email => {
//     passport,
//     email => User.findOne({
//         where: {
//             email: email
//         }
//     })
// })

const aleatoryNumber = () => {
    return Date.now() + Math.random()
}
// let aleatoryNumber = function () => {
//     Date.now() + Math.random()
// }


/////////////////////////////////////////////////////////////////////////////////////////////// GET

server.get('/', (req, res, next) => {
    console.log(req.sessionID)
    res.send('funciona')
})

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


/////////////////////////////////////////////////////////////////////////////////////////////// POST
/////s63 ---> creo ruta de login 
server.post('/login', passport.authenticate('local', {
    successRedirect: 'http://localhost:3000/auth/',
    failureRedirect: 'http://localhost:3000/auth/login',
    failureFlash: true,
}))

/////s64 ---> creo ruta de logout
server.post('/logout', (req, res) => {
    // req.logout(); //----> hace falta??
    // remove the session user id
    /* req.session.userId = null; */

    const {
        idUser,
        name,
        email,
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
        // si el usuario que hace logout no es user ni admin, es decir es GUEST

        console.log('entro')
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

server.post('/cookie', async (req, res) => {

    const {
        carrito,
        idUser,
        name,
        email,
        level
    } = req.body

    console.log(req.body)

    let aleatoryEmail = aleatoryNumber();

    const hashedPassword = await bcrypt.hash('guest', 10)

    // Llega info del front, si idUser no existe o es 0 se cre el usuario GUEST con su Orden
    if (idUser == 0) {

        console.log('entro a guest')

        User.create({
            name: 'guest',
            email: aleatoryEmail + '@gmail.com',
            password: hashedPassword,
            level: 'GUEST'
        }).then((newUser) => {
                Order.create({
                idUser: newUser.idUser,
                status: 'CREADA'
            })
            return newUser
            
        }).then((newUser) => {
            console.log(newUser)
            res.status(401).send({
                'idUser': newUser.idUser,
                'name': newUser.name,
                'email': newUser.email,
                'level': newUser.level,
                'verified': true
            })
        }
            
        )
    }
    // En el caso que el idUser exista y sea valido busca el usuario y devuelve sus datos
    else {

        console.log('entro a findOne')

        User.findOne({
            where: {
                idUser: idUser
            }
        }).then((user) => res.send({
            'idUser': user.idUser,
            'name': user.name,
            'email': user.email,
            'level': user.level
        }))
    }
})


module.exports = server;