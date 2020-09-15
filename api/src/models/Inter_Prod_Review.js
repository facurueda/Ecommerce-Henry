const {
    DataTypes,
} = require('sequelize');
module.exports = (sequelize) => {
    sequelize.define('Inter_Prod_Review', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            notNull: true
        },
        idProduct: {
            type: DataTypes.INTEGER,
            notNull: true
        },
        idReview: {
            type: DataTypes.INTEGER,
            notNull: true
        }
    })
}