const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('image', {
        idImage: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        idProduct: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        link: {
            type:DataTypes.STRING,
            allowNull:false
        }
    })
}