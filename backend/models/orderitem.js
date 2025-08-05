module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define("OrderItem", {
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  });

  OrderItem.associate = models => {
    OrderItem.belongsTo(models.Order, { foreignKey: "orderId" });
    OrderItem.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return OrderItem;
};
