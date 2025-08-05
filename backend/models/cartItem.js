module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  });

  CartItem.associate = models => {
    CartItem.belongsTo(models.User, { foreignKey: "userId" });
    CartItem.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return CartItem;
};
