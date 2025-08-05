module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("Payment", {
    orderId: DataTypes.INTEGER,
    method: DataTypes.STRING,
    status: DataTypes.ENUM("menunggu", "dibayar", "gagal"),
    amount: DataTypes.FLOAT
  });

  Payment.associate = models => {
    Payment.belongsTo(models.Order, { foreignKey: "orderId" });
  };

  return Payment;
};
