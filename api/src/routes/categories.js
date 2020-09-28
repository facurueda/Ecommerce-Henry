
const server = require('express').Router();
const { Categories, Product } = require('../db.js');

/////////////////////////////////////////////////////////////////////////////////////////////// FUNCTIONS TO SECURITY ROUTES
function isAdmin(req, res, next) {
    if(req.isAuthenticated()){
        if(req.user.level === 'admin'){
            console.log('this user is ADMIN')
            return next()
        } console.log('this user DOESNT ADMIN')
    }
    console.log('THIS USER NOT AUTHENTICATED')
    // ** -- DIRIGIR A PAGINA QUE PREGUNTE SI ESTA PERDIDO ** -- //
    res.redirect('/')
}
function isUserOrAdmin(req, res, next) {
    if(req.isAuthenticated()){
        if(req.user.level === 'user' || req.user.level === 'admin'){
            console.log('el usuario esta logeado')
            return next()
        } console.log('this user is GUEST')
    }
    console.log('THIS USER NOT AUTHENTICATED')
    res.redirect('htpp://localhost:3000/auth/login')
}
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
server.get('/', (req, res, next) => {
    Categories.findAll().then(categories => {
        res.send(categories)
    }).catch(next)
})
/////////////////////////////////////////////////////////////////////////////////////////////// POST
server.post('/create', isAdmin, (req, res, next) => {
    const { name, description } = req.body;
    Categories.create({
        name,
        description
    }).then(res.send(req.body))
        .catch(next);
})
/////////////////////////////////////////////////////////////////////////////////////////////// DELETE
server.delete('/:id', isAdmin, (req, res, next) => {
    Categories.destroy({
        where: { idCategory: req.params.id }
    }).then(() => {
        res.send({
            result: "Categoria eliminada"
        })
    }).catch(next)
})
/////////////////////////////////////////////////////////////////////////////////////////////// PUT
server.put('/:id', isAdmin, (req, res, next) => {
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