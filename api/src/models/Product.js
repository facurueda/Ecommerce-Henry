const { DataTypes, INTEGER } = require('sequelize')
module.exports = (sequelize) => {
  
  sequelize.define('product', {
    idProduct: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
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
     }
  });
};
