module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define("Review", {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    comment: DataTypes.TEXT
  });

  Review.associate = models => {
    Review.belongsTo(models.User, { foreignKey: "userId" });
    Review.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return Review;
};
