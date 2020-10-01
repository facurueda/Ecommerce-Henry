const server = require('express').Router();
const passport = require('passport');
const Sequelize = require("sequelize");
const {
    User,
    Order,
    Product,
    Inter_Prod_Order
} = require('../db.js');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

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

/////////////////////////////////DEV


server.post('/create-session', async (req, res) => {
    //Buscar Orden del usuario logeado por su idUser que viene en Req.user

    const userOrder = await Order.findOne({
        where: {
            idUser: req.user.idUser
        }
    })

    const allProdInOrder = await Inter_Prod_Order.findAll({
        where: {
            idOrder: userOrder.idOrder
        }
    })

    const productsToMap = allProdInOrder[0]



    console.log('IMPORTANTT', allProdInOrder)

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: 
            allProdInOrder.map(n => {
                return (
                    [allProdInOrder[n]]

                )
            }),
        
        // [allProdInOrder[0]

            // Mapear los productos de la orden
                    
                
            

        



        // {
        //     price_data: {
        //         currency: 'ars',
        //         product_data: {
        //             name: 'Stubborn Attachments',
        //             images: ['https://i.imgur.com/EHyR2nP.png'],
        //         },
        //         unit_amount: 2000000,
        //     },
        //     quantity: 1,
        // },
        // {
        //     price_data: {
        //         currency: 'ars',
        //         product_data: {
        //             name: 'Stubborn Attachments',
        //             images: ['https://i.imgur.com/EHyR2nP.png'],
        //         },
        //         unit_amount: 2000000,
        //     },
        //     quantity: 1,
        // },

        mode: 'payment',
        success_url: `http://localhost:3001/`,
        cancel_url: `http://localhost:3001/`,
    });
    res.json({
        id: session.id
    });
});






module.exports = server;