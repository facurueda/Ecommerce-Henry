const server = require('express').Router();
const passport = require('passport');
const Sequelize = require("sequelize");
const { Order, Product, Inter_Prod_Order } = require('../db.js');

/////////////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS TO SECURITY ROUTES
function isAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        if (req.user.level === 'admin') {
            console.log('this user is ADMIN')
            return next()
        } console.log('this user DOESNT ADMIN')
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
        } console.log('this user is GUEST')
    }
    console.log('THIS USER NOT AUTHENTICATED')
    res.redirect('htpp://localhost:3000/auth/login')
}

///////////////////////////////////////////GET

server.get('/:idUser', (req, res, next) => {
    Order.findOne({
        where: {
            idUser: req.params.idUser,
            [Sequelize.Op.or]: [{ status: "CREADA" }, { status: 'CARRITO' }]
        },
        include: [{
            model: Product,
            as: 'products',
        }]
    }).then((order) => {
        res.send(order)
    }).catch(next);
})

server.get('/history/:idUser', (req, res, next) => {
    Order.findAll({
        where: {
            idUser: req.params.idUser
        },
        include: [{model: Product,as: 'products'}]
    }).then(orders => {
        console.log('orders:\n',orders)
        res.send(orders)
    }).catch((error) => {
        console.log('error: \n',error)
        next()
    })
})
server.get('/search', isAdmin, (req, res, next) => {
    Order.findAll({
        where: {
            status: { [Sequelize.Op.like]: "%" + req.query.query + "%" }
        }
    }).then((orders) => {
        res.send(orders)
    }).catch(next);
})

server.get('/', (req, res, next) => {
    Order.findAll().then(orders => {
        res.send(orders)
    }).catch(next)
})
/////////////////////////////////////////POST
server.post('/', (req, res, next) => {
    const { idUser, idProduct } = req.body;
    Order.create({
        idUser,
        idProduct,
    }).then((order) => {
        res.send(order);
    }).catch(next)
});
///////////////////////////////////////////////////////////////////////////PUT

/////////////////////////////////DEV


server.post('/aaa', (req, res, next) => {
    Inter_Prod_Order.create({
        idProduct: 1,
        idOrder: 1,
        price: 2222.0,
        quantity: 3
    }).then(() => {
        return Inter_Prod_Order.create({
            idProduct: 2,
            idOrder: 1,
            price: 22.0,
            quantity: 5
        })
    }).then((order) => {
        res.send(order)
    }).catch(next);
})

module.exports = server;