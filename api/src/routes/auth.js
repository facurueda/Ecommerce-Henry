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

/////////////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS TO SECURITY ROUTES

function isAdmin(req, res, next) {
    if(req.isAuthenticated()){
        if(req.user.level === 'admin'){
            console.log('this user is ADMIN')
            return next()
        } console.log('this user DOESNT ADMIN')
    }
    console.log('THIS USER NOT AUTHENTICATED')
    // ** -- DIRIGIR A PAGINA QUE PREGUNTE SI ESTA PERDIDO ** -- //
    res.redirect('/')
}

function isUserOrAdmin(req, res, next) {
    if(req.isAuthenticated()){
        if(req.user.level === 'user' || req.user.level === 'admin'){
            console.log('el usuario esta logeado')
            return next()
        } console.log('this user is GUEST')
    }
    console.log('THIS USER NOT AUTHENTICATED')
    res.redirect('htpp://localhost:3000/auth/login')
}


/////////////////////////////////////////////////////////////////////////////////////////////// GET

server.get('/testAuth', isUserOrAdmin, (req, res, next) => {
    res.send('funciona')
})

<<<<<<< HEAD
/////s65 devuelve el usuario logeado ----> me parece que esta muy mal esto jaja y
//no se si aca debe ser lo de la cookie?
server.get('/me', (req, res) => {
=======
server.get('/', isUserOrAdmin, (req,res) => {
    res.send('funcionnnaaaaa!!')
})


server.get('/me', isUserOrAdmin, (req, res) => {
>>>>>>> f8538ad31830bc98b330574b460d3e9d233a3098
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
    session:true,
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
<<<<<<< HEAD

    const { idUser, level } = req.body
    console.log(req.body)
=======
    const { idUser } = req.body
>>>>>>> f8538ad31830bc98b330574b460d3e9d233a3098
    let aleatoryEmail = aleatoryNumber();
    const hashedPassword = await bcrypt.hash('guest', 10)
    // Llega info del front, si idUser no existe o es 0 se cre el usuario GUEST con su Orden
<<<<<<< HEAD
    if (idUser === 0) {

=======
    if (idUser == 0) {
>>>>>>> f8538ad31830bc98b330574b460d3e9d233a3098
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
            // status(401)
            res.send({
                idUser: newUser.idUser,
                name: newUser.name,
                email: newUser.email,
                level: newUser.level,
                verified: true
            })
        })
    }
    else {
        console.log('yup')
        User.findOne({
            where: {
                idUser: idUser
            }
        }).then((user) => {
            res.send({
                idUser: user.idUser,
                name: user.name,
                email: user.email,
                level: user.level
            })
        })
    }
})


module.exports = server;