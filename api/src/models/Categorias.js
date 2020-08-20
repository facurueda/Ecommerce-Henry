const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
        type: DataTypes.STRING,
        notNull: true
    },
    products: {
        type: DataTypes.JSON,
        notNull: true
    }
  });
};