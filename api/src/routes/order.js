const server = require('express').Router();
const Sequelize = require("sequelize");
const { Order , Product, Inter_Prod_Order } = require('../db.js');

///////////////////////////////////////////GET

///ver
server.get('/:idOrder/cart', (req,res, next) => {
    Inter_Prod_Order.findAll({
        where: {
            idOrder: req.params.idOrder
            //status: 'INPROGRESS'
        }, 
        include: [{
            model: Product,
            as: 'products'
        }]
    }).then(products => {
        res.send(products)
    }).catch(next);
})

server.get('/:idOrder', (req,res,next) => {
    Order.findOne({ 
        where: {
            idOrder: req.params.idOrder, 
        }, 
        include: [{
            model: Product,
            as: 'products',
        }]
     }).then((order) => {
         res.send(order)
        }).catch(next);
})

server.get('/', (req,res,next) => {
    Order.findAll().then((orders) => {
        res.send(orders)
    }).catch(next);
})

/////////////////////////////////////////POST

server.post('/:idOrder/cart', (req, res, next) => {
    const { idProduct, quantity, price } = req.body
    Inter_Prod_Order.create({ 
        where: {
            idOrder: req.body.idOrder,
            idProduct : idProduct,
            quantity: quantity,
            price: price
        }
    }).then(order => {
        res.send(order)
    })
});


///VER

server.post('/', (req,res,next) => {
    const { idUser, idProduct } = req.body;
    Order.create({
        idUser,
        idProduct,
        status: { values: ['CREATED'] }
    }).then((order) => {
        res.send(order);
    }).catch(next)
});


///////////////////////////////////////////////////////////////////////////PUT
///////ver 

server.put('/:idOrder/cart', (req,res,next) => {
    const { idProduct, quantity } = req.body
    Inter_Prod_Order.findAll({
        where: { 
            idOrder: req.params.idOrder,
            idProduct: req.body.idProduct
        }
    }).then(order => {order.update({
        ...order,
        quantity: quantity
    }).then(() => {
        res.send(order)
    })
    }).catch(next);
})

server.put('/:idOrder', (req,res,next) => {
    Order.findOne({
        where: {
            idOrder: req.params.idOrder
        }
    }).then(() => {
        res.send(order)
    }).catch(next)
})


///////////////////////////////////////////////////////////////////////////////////////////DELETE
//ver
// server.delete('/:idOrder/cart', (req,res,next) => {
//     Inter_Prod_Order.destroy({
//         where: {
//             idOrder: req.params.idOrder
//         }
//     }).then(order => {
// 		
// 		else {
// 			res.status(400).send()
// 		}
// 	}).catch(() => {
// 		res.status(400)
// 	})
// })

/////////////////////////////////////////////DEV

server.post('/aaa', (req, res, next) => {
	Order.create({
        idOrder: 1,
		idUser: 1,
        idProduct: 1,
	}).then(()=> {
        return Inter_Prod_Order.create({
            idProduct: 1,
            idOrder: 1,
            price: 2222.0,
            quantity: 3
        })
    }).then(()=> {
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