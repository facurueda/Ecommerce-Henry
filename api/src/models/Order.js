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
    idProduct: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM,
        values: ['carrito', 'created', 'processing', 'deleted', 'success']
    }
  });
};
