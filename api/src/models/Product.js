const Product = (sequelize, S) => {
  // defino el modelo
  const P = sequelize.define('product', {
    id: {
      type: S.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
  });
  
  return P;
};

module.exports = Product;
