const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  sequelize.define("direccion", {
    idDireccion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    // idOrder: {
    //     type: DataTypes.INTEGER,
    // },
    provincia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ciudad: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    calle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numeracion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    barrio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    piso: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    depto: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    CP: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
