module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    buyerId: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    totalAmount: DataTypes.FLOAT,
    status: DataTypes.ENUM("dibayar", "diproses", "siap dikirim", "dalam perjalanan", "selesai")
  });

  Order.associate = models => {
    Order.belongsTo(models.User, { foreignKey: "buyerId" });
    Order.belongsTo(models.Store, { foreignKey: "storeId" });
    Order.hasMany(models.OrderItem, { foreignKey: "orderId" });
    Order.hasOne(models.Delivery, { foreignKey: "orderId" });
    Order.hasOne(models.Payment, { foreignKey: "orderId" });
  };

  return Order;
};
