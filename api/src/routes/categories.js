
const server = require('express').Router();
const { Categories } = require('../db.js');
const Product = require('../models/Product.js');


server.post('/:id/:name/:description/:products',(req,res,next) => {
    const {id,name, description, products} = req.params;
    Categories.create({
        id,
        name,
        description,
        products: JSON.stringify({ids:[products]})
    }).then(res.send(req.params))
    .catch(next);
})






module.exports = server;