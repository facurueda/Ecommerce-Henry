const server = require('express').Router();
const Sequelize = require("sequelize");
const {
	Product,
	Categories,
	Inter_Cat_Prod,
} = require('../db.js');
/////////////////////////////////////////////////////////////////////////////////////////////// GETS
server.get('/search', (req, res, next) => {
	Product.findAll({
			where: {
				[Sequelize.Op.or]: [{
						name: {
							[Sequelize.Op.like]: "%" + req.query.query + "%"
						}
					},
					{
						description: {
							[Sequelize.Op.like]: "%" + req.query.query + "%"
						}
					}
				]
			}
		})
		.then((products) => {
			res.send(products);
		}).catch(next)
});

server.get('/:id', (req, res, next) => {
	// GET /products/:id
	// Retorna un objeto de tipo producto con todos sus datos. (Incluidas las categorías e imagenes).
	Product.findOne({
		where: {
			idProduct: req.params.id
		},
		include: [{
			model: Categories,
			as: 'categories'
		}]
	}).then((product) => {
		res.send(product)
	}).catch(next)
});


server.get('/', (req, res, next) => {
	Product.findAll()
		.then((products) => {
			res.send(products);
		}).catch(next)
});
/////////////////////////////////////////////////////////////////////////////////////////////// POSTS
server.post('/aaa', (req, res, next) => {
	Product.create({
		name: "Dragon",
		description: "Escupe Fuego",
		precio: 10,
		rating: 5,
		stock: 10,
		images: 'http://www.google.com/'
	}).then(() => {
		return Categories.create({
			name: "animales",
			description: "Todo tipo de animales"
		})
	}).then(() => {
		return Categories.create({
			name: "Objetos",
			description: "Todo tipo de objetos"
		})
	}).then(() => {
		return Categories.create({
			name: "Perros",
			description: "la recontra descripcion"
		})
	}).then(() => {
		return Product.create({
			name: "Perro",
			description: "Hace afuera",
			precio: 10,
			rating: 5,
			stock: 10,
			images: 'http://www.google.com'
		})
	}).then(() => {
		return Inter_Cat_Prod.create({
			idCategory: 2,
			idProduct: 1
		})
	}).then(() => {
		return Inter_Cat_Prod.create({
			idCategory: 1,
			idProduct: 2
		})
	}).then(() => {
		return res.send({
			result: "Elementos creados."
		})
	}).catch(next)
})
server.post('/create', (req, res, next) => {
	const {
		name,
		description,
		precio,
		rating,
		stock,
		images
	} = req.body;
	Product.create({
		name,
		description,
		precio,
		rating,
		stock,
		images
	}).then((product) => {
		Categories.findOne({
			where: { name: req.body.categories }
		}).then(category => {
			Inter_Cat_Prod.create({
				idCategory: category.idCategory,
				idProduct: product.idProduct
			})
		})
		res.send(req.body)
	}).catch(next);
});
server.post('/:idProducto/category/:idCategoria', (req, res, next) => {
	Inter_Cat_Prod.create({
		idCategory: req.body.idCategory,
		idProduct: req.body.idProduct
	}).then(() => {
		res.send(req.body)
	}).catch(next)
})
/////////////////////////////////////////////////////////////////////////////////////////////// DELETE
server.delete('/:idProduct/category/:idCategory', (req, res, next) => {
	/////////////////////////// Elimina la categoria del producto:
	Inter_Cat_Prod.destroy({
		where: {
			idProduct: req.body.idProduct,
			idCategory: req.body.idCategory
		}
	}).then(() => {
		res.send(req.body)
	}).catch(next)
})
server.delete('/:idProducto', (req, res, next) => {
	/////////////////////////// Elimina un producto:
	Product.destroy({
		where: {
			idProduct: req.params.idProducto

		}
	}).then((product) => {
		if (product) {
			res.status(200).send()
		} else {
			res.status(400).send()
		}
	}).catch(() => {
		res.status(400)
	})
})
/////////////////////////////////////////////////////////////////////////////////////////////// PUT
server.put('/:id', (req, res, next) => {
	Product.findOne({
		where: {
			idProduct: req.body.idProduct
		}
	}).then(product => {
		product.update({
			...product,
			name: req.body.name,
			description: req.body.description,
			precio: req.body.precio,
			stock: req.body.stock,
			images: req.body.images
		}).then(() => {
			res.send(product)
		})
	}).catch(next);
})
module.exports = server;