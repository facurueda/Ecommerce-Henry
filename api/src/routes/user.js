const server = require('express').Router();
const { User, Order, Inter_Prod_Order} = require('../db.js');

/////////////////////////////////////////////////////////////////GET

server.get('/:idUser/orders', (req,res,next) => {
    Order.findAll({
        where: {
            idUser: req.param.idUser
        }
    }).then((orders) => {
        res.send(orders)
    }).catch(next);
})

server.get('/', (req,res,next) => {
    User.findAll().then((users) => {
        res.send(users)
    });
})

//////////////////////////////////////////////////////////////////POST



server.post('/', (req, res, next) => {
    const { name, email, password } = req.body
    User.create({
        name,
        email,
        password
    }).then(() => {
		res.send(req.body)
    }).catch(next);
});

///////////////////////////////////////////////////////////////PUT


server.put('/:idUser', (req, res, next) => {
    User.findOne({
        where: { 
            idUser: req.body.idUser
        }
    }).then(user => { user.update({
        ...user,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password    
    }).then(res.send(req.body))
    }).catch(next);
});


///////////////////////////////////////////////////////////DELETE

server.delete('/:idUser', (req, res, next) => {
    User.destroy({
        where: {
            idUser: req.body.idUser
        }
    }).then(() => {
        res.send(req.body)
    }).catch(next);
});

/////////////////////////////////////////////DEV

server.post('/aaa', (req, res, next) => {
	User.create({
        name: 'Je',
        email: 'carlitos@live.com',
        password: 'jasjdjsjd'
	}).then(()=> {
        res.send(req.body);
    }).catch(next)
})


module.exports = server;