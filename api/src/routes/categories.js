
const server = require('express').Router();
const { Categories } = require('../db.js');
const Product = require('../models/Product.js');


server.post('/create', (req, res, next) => {
    const { name, description } = req.body;
    Categories.create({
        name: req.body.name,
        description: req.body.description
    }).then(res.send(req.body))
        .catch(next);
})






module.exports = server;