module.exports = (sequelize, DataTypes) => {
  const Delivery = sequelize.define("Delivery", {
    orderId: DataTypes.INTEGER,
    driverId: DataTypes.INTEGER,
    status: DataTypes.ENUM("menunggu", "dalam perjalanan", "selesai"),
    trackingCode: DataTypes.STRING
  });

  Delivery.associate = models => {
    Delivery.belongsTo(models.Order, { foreignKey: "orderId" });
    Delivery.belongsTo(models.User, { foreignKey: "driverId" });
  };

  return Delivery;
};
