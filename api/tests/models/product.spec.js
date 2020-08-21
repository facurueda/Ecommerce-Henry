const { Product, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe(' --- Product model', () => {

  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

    describe('El modelo', () => {

      it('tiene los atributos minimos', () => {
          expect(Product.tableAttributes.name).to.be.an('object');
          expect(Product.tableAttributes.description).to.be.an('object');
          expect(Product.tableAttributes.precio).to.be.an('object');
          expect(Product.tableAttributes.stock).to.be.an('object');
          expect(Product.tableAttributes.categorias).to.be.an('object');
          expect(Product.tableAttributes.image).to.be.an('object');
          expect(Product.tableAttributes.rating).to.be.an('object');
      });

    })

  describe('Validators', () => {
    beforeEach(() => Product.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Product.create({        
        })
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Product.create({ name: 'Producto' });
      });
    });
  });

});

