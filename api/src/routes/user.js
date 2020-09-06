const server = require('express').Router();
const { User, Order, Inter_Prod_Order } = require('../db.js');
const Sequelize = require("sequelize");

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
        res.send({ result: 'Carrito vaciado' })
    }).catch(next);
})


server.get('/', (req, res, next) => {
    User.findAll().then((users) => {
        res.send(users)
    });
})


//////////////////////////////////////////////////////////////////POST

server.post('/:idUser/cart', (req, res, next) => {
    let respuesta = {}
    Order.findOne({
        where:
        {
            idUser: req.params.idUser,
            [Sequelize.Op.or] : [{ status: 'CREADA'} , { status: 'CARRITO' }]
        }
    }).then(order => {
        if(order.status === 'CREADA'){
            order.update({
                ...order,
                status: 'CARRITO'
            });
            respuesta = {
                result: 'Primer producto agregado'
            }
        } else {
            respuesta = {
                result: 'Producto sumado a los anteriores'
            }
        }
        Inter_Prod_Order.create({
            idOrder: order.idOrder,
            idProduct: req.body.idProduct,
            quantity: req.body.quantity,
            price: req.body.price
        })
    }).then((respuesta) => {
        res.send(respuesta)
    }).catch(next)
})

server.post('/', (req, res, next) => {
    const { name, email, password } = req.body
    User.create({
        name,
        email,
        password
    }).then((newUser) => {
        Order.create({
            idUser: newUser.idUser,
        })
    }).then(() => {
        res.send({ result : 'Usuario creado' })
    }).catch(next);
});

///////////////////////////////////////////////////////////////PUT

server.put('/:idUser/cart', (req, res, next) => {
    const { idProduct, quantity } = req.body
    Order.findOne({
        where: {
            idUser: req.params.idUser,
            status: 'CARRITO'
        }
    }).then(order => {
        return Inter_Prod_Order.findOne({
            where: {
                idOrder: order.idOrder,
                idProduct: idProduct
            }
        })
    }).then((relacion) => {
        relacion.update({
            ...relacion,
            quantity: quantity
        })
    }).then(() => {
        res.send(order)
    }).catch(next);
})


server.put('/:idUser', (req, res, next) => {
    User.findOne({
        where: {
            idUser: req.body.idUser
        }
    }).then(user => {
        user.update({
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
       order.update({
           ...order,
           status: 'CANCELADA'
       })
    }).then(() => {
        Order.create({
            idUser: req.params.idUser
        })
    }).then(() => {
        res.send({ result: 'Carrito vaciado' })
    }).catch(next);
})

server.delete('/:idUser', (req, res, next) => {
    User.destroy({
        where: {
            idUser: req.body.idUser
        }
    }).then(() => {
        res.send({ result: 'User eliminado' })
    }).catch(next);
});

/////////////////////////////////////////////DEV

server.post('/aaa', (req, res, next) => {
    User.create({
        name: 'Michael',
        email: 'michael@live.com',
        password: 'aosidj'
    }).then(() => {
        return User.create({
            name: 'Lili',
            email: 'lili@gmail.com',
            password: 'jasjdjsjd'
        })
    }).then(() => {
        return User.create({
            name: 'Sophie',
            email: 'sophie@gmail.com',
            password: 'jasjdjsjd'
        })
    }).then(() => {
        res.send({ result: 'user creados' })
    }).catch(next)
})

module.exports = server;