const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  
  sequelize.define('product', {
    name: {
      primaryKey: true,
      type: DataTypes.STRING,
      notNull: true,
    },
    description: {
      type: DataTypes.STRING,
      notNull: true,
    },
    precio: {
      type: DataTypes.INTEGER,
      notNull: true,
    },
    stock: { 
      type: DataTypes.INTEGER,
      notNull: true,
     },
    categorias: {
      type: DataTypes.JSON,
      notNull: true,
    },
    image: {
      type: DataTypes.JSON,
      notNull: true,
    },

  });
};
