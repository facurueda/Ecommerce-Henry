const server = require('express').Router();
const { Product, Categories, Inter_Cat_Prod } = require('../db.js');


server.post('/crear', (req, res, next) => {
	const { id, name, description, precio, rating, stock } = req.body;
	Product.create({
		id,
		name,
		description,
		precio,
		rating,
		stock,
	}).then(res.send(req.body))
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
server.post('/:idProducto/category/:idCategoria', (req, res, next) => {
	Inter_Cat_Prod.create({
		idCategorie: req.body.idCategorie,
		idProduct: req.body.idProduct
	}).then(res.send(req.body));
});


server.delete('/:idProducto/category/:idCategoria', (req, res, next) => {
	Inter_Cat_Prod.destroy({
		where: {
			idProduct: req.body.idProduct,
			idCategorie: req.body.idCategorie
		}
	}).then(res.send(req.body))
		.catch(next);


});

server.put('/category/:id', (req, res, next) => {
	Categories.findOne({where: {id:req.params.id}}).then(category => {
		category.update({...category,
			name: req.body.name,
			description: req.body.description
		}).then(res.send(req.body))
	}).catch(next);
});





//Product.findAll({
/* 	where : {
		categorias : req.params
	}
})
 */

module.exports = server;
