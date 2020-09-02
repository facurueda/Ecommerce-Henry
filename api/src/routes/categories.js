
const server = require('express').Router();
const { Categories, Product} = require('../db.js');


/////////////////////////////////////////////////////////////////////////////////////////////// GET
server.get('/:nombreCat', (req, res, next) => {
    Categories.findOne({
        where: {
            name: req.params.nombreCat

        },
        include: [{ model: Product, as: 'products' }]
    }).then((category) => {
        res.send(category.products)
    }).catch(next)
})

server.get('/', (req,res,next) => {
    Categories.findAll().then(categories => {
        res.send(categories)
    }).catch(next)
})


/////////////////////////////////////////////////////////////////////////////////////////////// POST
server.post('/create', (req, res, next) => {
    const { name, description } = req.body;
    Categories.create({
        name,
        description
    }).then(res.send(req.body))
        .catch(next);
})




/////////////////////////////////////////////////////////////////////////////////////////////// DELETE
server.delete('/:id', (req, res, next) => {
    console.log(req.params)
    Categories.destroy({
        where: { idCategory: req.params.id }
    }).then(() => {
        res.send({
            result: "Categoria eliminada"
        })
    }).catch(next)
})




/////////////////////////////////////////////////////////////////////////////////////////////// PUT
server.put('/:id', (req, res, next) => {
	Categories.findOne({
		where: {
			idCategory: req.body.idCategory
		}
	}).then(category => {
		category.update({
			...category,
			name: req.body.name,
			description: req.body.description
		}).then(() => {
            res.status(200)
            res.send(category)
		}).catch(() => {
            res.status(400)
		}).catch(next)
	})
})


module.exports = server;