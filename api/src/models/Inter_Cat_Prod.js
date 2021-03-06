const {
    DataTypes,
} = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Inter_Cat_Prod', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            notNull: true
        },
        idCategory: {
            type: DataTypes.INTEGER,
            notNull: true
        },
        idProduct: {
            type: DataTypes.INTEGER,
            notNull: true
        }
    })
}