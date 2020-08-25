
const server = require('express').Router();
const { Categories } = require('../db.js');


server.post('/:id/:name/:description/:products',(req,res,next) => {
    const {name, description} = req.body;
    Categories.create({
        name,
        description
    }).then(res.send(req.body))
    .catch(next);
})






module.exports = server;