const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  sequelize.define('review', {
    idReview: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      idProduct: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  });
};
