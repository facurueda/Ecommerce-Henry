const server = require('express').Router();
const Sequelize = require("sequelize");
const {
	Product,
	Categories,
	Inter_Cat_Prod,
	Inter_Prod_Order,
	Review
} = require('../db.js');


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

/////////////////////////////////////////////////////////////////////////////////////////////// GETS
///////////////////////////// RUTA PARA OBTENER TODAS REVIEW DE UN PRODUCTO

server.get('/:id/review/', (req, res, next) => {
	Product.findOne({ where: { idProduct: req.params.id }, include: [{ model: Review, as: 'reviews' }] })
		.then((rev) => {
			res.send(rev.reviews)
		}).catch(next)
});

server.get('/search', (req, res, next) => {
	Product.findAll({
		where: {
			[Sequelize.Op.or]: [{
				name: {
					[Sequelize.Op.like]: "%$" + req.query.query + "$%"
				}
			},
			{
				description: {
					[Sequelize.Op.like]: "%$" + req.query.query + "$%"
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
	Product.findOne({
		where: {
			idProduct: req.params.id
		},
		include: [{
			model: Categories,
			as: "categories"
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
// POST /product/:id/review

///////////////////////////// RUTA PARA CREAR REVIEW
///////////////////////////// POR FAVOR DEJEN DE PONER PRODUCT AL PRINCIPIO DEL LINK

server.post('/:idProduct/review', isUserOrAdmin, (req, res, next) => {
	Review.create({
		description: req.body.description,
		rating: req.body.rating,
		idUser: req.user.idUser,
		idProduct: req.params.idProduct
	}).then((result) => {
		res.send(result)
	}).catch(next)
})
server.post('/create', isAdmin, (req, res, next) => {
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
			where: {
				name: req.body.categories
			}
		}).then(category => {
			Inter_Cat_Prod.create({
				idCategory: category.idCategory,
				idProduct: product.idProduct
			})
		})
		res.send(req.body)
	}).catch(next);
});
server.post('/:idProducto/category/:idCategoria', isAdmin, (req, res, next) => {
	Inter_Cat_Prod.create({
		idCategory: req.body.idCategory,
		idProduct: req.body.idProduct
	}).then(() => {
		res.send(req.body)
	}).catch(next)
})
/////////////////////////////////////////////////////////////////////////////////////////////// DELETE


///////////////////////////// RUTA PARA DELETE REVIEW
server.delete('/product/:id/review/:idReview', isUserOrAdmin, (req, res, next) => {
	Review.destroy({
		where: {
			idReview: req.params.idReview
		}
	}).then((rev) => {
		if (rev) {
			res.status(200).send('Success')
		} else {
			res.status(400).send('Error, this review doesnt exist')
		}
	}).catch(() => {
		res.status(400)
	})
})

server.delete('/:idProduct/category/:idCategory', isAdmin, (req, res, next) => {
	Inter_Cat_Prod.destroy({
		where: {
			idProduct: req.body.idProduct,
			idCategory: req.body.idCategory
		}
	}).then(() => {
		res.send(req.body)
	}).catch(next)
})
server.delete('/:idProducto', isAdmin, (req, res, next) => {
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

///////////////////////////// RUTA PARA MODIFICAR REVIEW
server.put('/:idProduct/review/:idReview', (req, res, next) => {
	Review.findOne({
		where: {
			idReview: req.params.idReview
		}
	}).then(rev => {
		return rev.update({
			...rev,
			description: req.body.description,
			rating: req.body.rating
		})
	})
		.then((rev) => {
			res.send(rev)
		}).catch(next)
})


server.put('/:idProduct', isAdmin, (req, res, next) => {
	let productUpdated = null
	Product.findOne({
		where: {
			idProduct: req.params.idProduct
		}
	}).then(product => {
		return product.update({
			...product,
			name: req.body.name,
			description: req.body.description,
			precio: req.body.precio,
			stock: req.body.stock,
			images: req.body.images
		})
	}).then((product) => {
		productUpdated = product;
		return Inter_Cat_Prod.findOne({
			where: { idProduct: product.idProduct }
		})
	}).then((inter) => {
		return inter.update({
			...inter,
			idCategory: req.body.categories
		})
	}).then((interUpdated) => {
		console.log('responding', productUpdated, interUpdated)
		res.send({ product: productUpdated, category: interUpdated })
	}).catch(next);
})
/////////////////////////////////////////////////////////////////////////////////////////////// DEV
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
module.exports = server;