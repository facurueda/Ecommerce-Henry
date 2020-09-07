const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  sequelize.define('order', {
    idOrder: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'CREADA'
    }
  });
};
