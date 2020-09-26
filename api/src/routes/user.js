const server = require('express').Router();
const {
    User,
    Order,
    Inter_Prod_Order,
    Product
} = require('../db.js');
const Sequelize = require("sequelize");
const bcrypt = require('bcrypt')

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


/////////////////////////////////////////////////////////////////GET

server.get('/:idUser/orders', (req, res, next) => {
    Order.findAll({
        where: {
            idUser: req.params.idUser
        }
    }).then((orders) => {
        res.send(orders)
    }).catch(next);
})
server.get('/:idUser/cart', (req, res, next) => {
    Order.findOne({
        where: {
            idUser: req.params.idUser,
            status: 'CARRITO'
        },
        include: [{
            model: Product,
            as: 'products',
        }]
    }).then(order => {
        order.update({
            ...order,
            status: 'COMPLETA'
        })
    }).then(() => {
        Order.create({
            where: {
                idUser: req.params.idUser,
            }
        })
    }).then(() => {
        res.send({
            result: 'Carrito vaciado'
        })
    }).catch(next);
})

server.get('/:idUser', (req, res, next) => {
    User.findOne({
        where: {
            idUser: req.params.idUser
        },
        include: [{
            model: Order,
            as: 'orders'
        }]
    }).then((user) => {
        res.send(user)
    })
})

server.get('/', (req, res, next) => {
    User.findAll().then((users) => {
        res.send(users)
    });
})
//////////////////////////////////////////////////////////////////POST
server.post('/:idUser/cart', (req, res, next) => {
    // body: { idProduct, quantity }
    let respuesta = {}
    Order.findOne({
        where: {
            idUser: req.params.idUser,
            [Sequelize.Op.or]: [{
                status: 'CREADA'
            }, {
                status: 'CARRITO'
            }]
        }
    }).then(order => {
        console.log(order)
        if (order.status === 'CREADA') {
            order.update({
                ...order,
                status: 'CARRITO'
            }).catch(next)
            respuesta = {
                result: 'Primer producto agregado'
            }
        } else {
            respuesta = {
                result: 'Producto sumado a los anteriores'
            }
        }
        Inter_Prod_Order.findOne({
            where: {
                idOrder: order.idOrder,
                idProduct: req.body.idProduct
            }
        }).then((inter) => {
            if (inter.quantity <= 1 && req.body.quantity === -1) {
                return Inter_Prod_Order.destroy({
                    where: {
                        idOrder: order.idOrder,
                        idProduct: req.body.idProduct
                    }
                })
            } else {
                return inter.update({
                    ...inter,
                    quantity: inter.quantity + req.body.quantity
                })
            }
        }).catch(() => {
            console.log(req.body);
            return Inter_Prod_Order.create({
                idOrder: order.idOrder,
                idProduct: req.body.idProduct,
                quantity: req.body.quantity,
                price: req.body.price
            })
        })
    }).then((respuesta) => {
        res.send(respuesta)
    }).catch(next)
})

//////// register 
server.post('/', async (req, res, next) => {
    const {
        name,
        email,
        password,
    } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)

    User.findOne({
        where: {
            email: email
        }
    }).then((user) => {
        if (!user) {
            User.create({
                name: name,
                email: email,
                password: hashedPassword,
                level: 'user'
            }).then(user => {

                return Order.create({
                    idUser: user.idUser,
                    status: 'CREADA'
                })
            })
        } else {
            res.status(404).send({
                result: "El usuario ya existe"
            })
        }
    }).then(() => {
        res.redirect('http://localhost:3000/auth/login')
    })

});

///////////////////////////////////////////////////////////////PUT
server.put('/:idUser/cart', (req, res, next) => {
    const {
        idProduct,
        quantity
    } = req.body
    Order.findOne({
        where: {
            idUser: req.params.idUser,
            status: 'CARRITO'
        }
    }).then(order => {
        Inter_Prod_Order.findOne({
            where: {
                idOrder: order.idOrder,
                idProduct: idProduct
            }
        }).then((relacion) => {
            return relacion.update({
                ...relacion,
                quantity: quantity
            })
        })
        return order
    }).then((order) => {
        res.send(order)
    }).catch(next);
})

server.put('/:idUser', (req, res, next) => {
    User.findOne({
        where: {
            idUser: req.body.idUser
        }
    }).then(user => {
        return user.update({
            ...user,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
    }).then((userActualizado) => {
        res.send(userActualizado)
    }).catch(next);
});
///////////////////////////////////////////////////////////DELETE
server.delete('/:idUser/cart', (req, res, next) => {
    Order.findOne({
        where: {
            idUser: req.params.idUser,
            status: 'CARRITO'
        }
    }).then(order => {
        return order.update({
            ...order,
            status: 'CANCELADA'
        })
    }).then(() => {
        return Order.create({
            idUser: req.params.idUser
        })
    }).then(() => {
        res.send({
            result: 'Carrito vaciado'
        })
    }).catch(next);
})

server.delete('/:idUser', (req, res, next) => {
    User.destroy({
        where: {
            idUser: req.body.idUser
        }
    }).then(() => {
        res.send({
            result: 'User eliminado'
        })
    }).catch(next);
});

/////////////////////////////////////////////DEV
server.post('/aaa', (req, res, next) => {
    User.create({
        name: 'Michael',
        email: 'michael@live.com',
        password: 'aosidj',
        level: 'admin'
    }).then(() => {
        return User.create({
            name: 'Lili',
            email: 'lili@gmail.com',
            password: 'jasjdjsjd',
            level: "user"
        }).then((newUser) => {
            Order.create({
                idUser: newUser.idUser,
            })
        })
    }).then(() => {
        return User.create({
            name: 'Sophie',
            email: 'sophie@gmail.com',
            password: 'jasjdjsjd',
            level: 'user'
        }).then((newUser) => {
            Order.create({
                idUser: newUser.idUser,
            })
        })
    }).then(() => {
        res.send({
            result: 'user creados'
        })
    }).catch(next)
})
module.exports = server;