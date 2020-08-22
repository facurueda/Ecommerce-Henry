const server = require('express').Router();
const { Product } = require('../db.js');
const Categorias = require('../models/Categorias.js');

//http://localhost:3000/crear/producto/gato1/holamundo/123/3/1/1/1
///:description/:precio/:rating/:stock/:idCategoria/:idImage
//description,precio,rating,stock,idCategoria,idImage
server.post('/crear/:name/:description/:precio/:rating/:stock/:idCategoria/:idImage',(req,res,next) => {
	const {name,description,precio,rating,stock,idCategoria,idImage} = req.params;
	Product.create({
		name,
		description,
		precio,
		rating,
		stock,
		categorias: JSON.stringify({ids:[idCategoria]}),
		image: JSON.stringify({links: [idImage]})
	}).then(res.send(req.params))
	.catch(next);
});

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});
/*POST /products/:idProducto/category/:idCategoria

Agrega la categoria al producto.



DELETE /products/:idProducto/category/:idCategoria

Elimina la categoria al producto.

*/
server.post('/products/:idProducto/category/:idCategoria', (req,res,next) => {
	Categorias.findByPk(req.params.idCategoria)
	.then(categorias => {
		Product.findByPk(req.params.idProducto)
		.then(producto => {
			let prod = JSON.parse(producto.categorias);
			prod.ids.push(req.params.idCategoria)
			Product.update(prod,{where: {id: req.params.idProducto}})
		}).catch(next)
	})
})

module.exports = server;
