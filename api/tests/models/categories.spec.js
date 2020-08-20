const { Categories, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe(' --- Categories model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

    
    describe('El modelo', () => {
        it('tiene los atributos minimos', () => {
            expect(Categories.tableAttributes.name).to.be.an('object');
            expect(Categories.tableAttributes.description).to.be.an('object');
        })
    })
    describe('Validators', () => {
        beforeEach(() => Categories.sync({ force: true }));
        describe('name', () => {
        it('should throw an error if name is null', (done) => {
            Categories.create({        
            })
            .then(() => done(new Error('It requires a valid name')))
            .catch(() => done());
        });
        it('should work when its a valid name', () => {
            Categories.create({ name: 'Categorias' });
        });
        })
    });
});