const {
  DataTypes
} = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('review', {
    idReview: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    idProduct: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      allowNull: true
    }
  });
};