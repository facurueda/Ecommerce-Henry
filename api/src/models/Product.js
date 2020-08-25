const { DataTypes, INTEGER } = require('sequelize')
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
     }
  });
};
