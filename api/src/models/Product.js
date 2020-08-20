const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('product', {
    name: {
      primaryKey: true,
      type: DataTypes.STRING,
      // allowNull: false,
      notNull: true,
    },
    description: {
      type: DataTypes.STRING,
      // allowNull: false,
      notNull: true,
    },
    precio: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      notNull: true,
    },
    stock: { 
      type: DataTypes.INTEGER,
      notNull: true,
     },
    categorias: {
      type: DataTypes.JSON,
      // allowNull: false
      notNull: true,
    },
    image: {
      type: DataTypes.JSON,
      // allowNull: false,
      notNull: true,
    },

  });
};
