const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // notNull: true,
      unique: true
    },
    description: {
        type: DataTypes.STRING,
        // allowNull: true,
        notNull: true
    },
    products: {
        type: DataTypes.JSON,
        notNull: true
    }
  });
};