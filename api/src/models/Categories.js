const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('categories', {
    idCategory:{
      type: DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // notNull: true,
    },
    description: {
        type: DataTypes.STRING,
        // allowNull: true,
        notNull: true
    }
  });
};