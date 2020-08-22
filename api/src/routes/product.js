const server = require('express').Router();
const { Product } = require('../db.js');
const Categories = require('../models/Categories.js');

//http://localhost:3000/crear/producto/gato1/holamundo/123/3/1/1/1
///:description/:precio/:rating/:stock/:idCategoria/:idImage
//description,precio,rating,stock,idCategoria,idImage
server.post('/crear/:id/:name/:description/:precio/:rating/:stock/:idCategoria/:idImage',(req,res,next) => {
	const {id,name,description,precio,rating,stock,idCategoria,idImage} = req.params;
	Product.create({
		id,
		name,
		description,
		precio,
		rating,
		stock,
		categories: JSON.stringify({ids:[idCategoria]}),
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
server.post('/:idProducto/category/:idCategoria', (req,res,next) => {
	Categories.findByPk(req.params.idCategoria)
	.then(categorias => {
		Product.findByPk(req.params.idProducto)
		.then(producto => {
			let prod = JSON.parse(producto.categories);
			prod.ids.push(req.params.idCategoria)
			Product.update({categories : prod},{where: {id: req.params.idProducto}}) 
		}).catch(next)
	})
})


server.delete('/products/:idProducto/category/:idCategoria', (req,res,next) => {
	Product.findByPk(req.params.idProducto)
	.then(producto => {
		let productito = JSON.parse(producto.categories)
		res.send(productito);
		productito = productito.filter((value) => {return value !== req.params.idCategoria})
		Product.update({categories : productito}, {where: {id : req.params.idProducto}})		
	})
	.catch(next)
	

})





//Product.findAll({
/* 	where : {
		categorias : req.params
	}
})
 */

module.exports = server;
