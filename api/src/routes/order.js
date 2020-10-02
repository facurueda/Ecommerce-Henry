const server = require('express').Router();
const passport = require('passport');
const Sequelize = require("sequelize");
const mercadopago = require('mercadopago');
const {
    User,
    Order,
    Product,
    Inter_Prod_Order
} = require('../db.js');

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

///////////////////////////////////////////GET

server.get('/:idUser', (req, res, next) => {
    Order.findOne({
        where: {
            idUser: req.params.idUser,
            [Sequelize.Op.or]: [{
                status: "CREADA"
            }, {
                status: 'CARRITO'
            }]
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
        include: [{
            model: Product,
            as: 'products'
        }]
    }).then(orders => {
        res.send(orders)
    }).catch((error) => {
        next()
    })
})
server.get('/search', isAdmin, (req, res, next) => {
    Order.findAll({
        where: {
            status: {
                [Sequelize.Op.like]: "%" + req.query.query + "%"
            }
        }
    }).then((orders) => {
        res.send(orders)
    }).catch(next);
})

server.get('/', (req, res, next) => {
    Order.findAll({
        include: [{
            model: Product,
            as: 'products',
        }]
    }).then(orders => {
        res.send(orders)
    }).catch(next)
})
/////////////////////////////////////////POST
server.post('/', (req, res, next) => {
    const {
        idUser,
        idProduct
    } = req.body;
    Order.create({
        idUser,
        idProduct,
    }).then((order) => {
        res.send(order);
    }).catch(next)
});
///////////////////////////////////////////////////////////////////////////PUT

/////////////////////////////////////////////////////////////////////////// MERCADOPAGO

server.post('/checkout', async (req, res,next) => {
    const allProdUser = await Order.findOne({
        where: {
            idUser: req.user.idUser,
            status: 'CARRITO'
        }
    }).then(order => {
        return Inter_Prod_Order.findAll({
            where: {
                idOrder: order.idOrder
            }
        })
    }).catch(next)

    console.log('ALLLPRODUUUUCT', allProdUser)

    mercadopago.configure({
        access_token: 'TEST-4039989208001293-100119-0edd096f6a0691afbce82062ef9e1a5b-653349945'
    });


    
    // Crea un objeto de preferencia
    const preference = {
        items: allProdUser.map(relacion_product_order => {
            return {
                title: 'ALLPRODUCT: ' + relacion_product_order.idProduct,
                description: '',
                unit_price: relacion_product_order.price,
                quantity: relacion_product_order.quantity,
            }
        }),
        back_urls: {
            success: 'http://localhost:3001/home'
        }
    };

    mercadopago.preferences.create(preference)
        .then(response => {
            console.log('RESPONSE', response)
            res.send(response.body.init_point)
            // Este valor reemplazará el string "<%= global.id %>" en tu HTML
            // global.id = response.body.id;
            // console.log('thiiisiss', global.id)
            // console.log('responsee', response)
            // LA RESPONSE TIENE MUCHA INFO, ENTRE ELLA EL LINK DE PAGO 'INIT_POINT'
            // res.send('TEST')
        }).catch(function (error) {
            console.log(error);
        });


})

/////////////////////////////////DEV





module.exports = server;