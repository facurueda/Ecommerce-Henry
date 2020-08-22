const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  
  sequelize.define('product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      notNull: true,

    },
    name: {
      
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
    rating: {
      type: DataTypes.INTEGER,
      notNull: false
    },
    stock: { 
      type: DataTypes.INTEGER,
      notNull: true,
     },
    categories: {
      type: DataTypes.JSON,
      notNull: true,
    },
    image: {
      type: DataTypes.JSON,
      notNull: true,
    },

  });
};
