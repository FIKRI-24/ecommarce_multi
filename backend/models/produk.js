module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    stock: DataTypes.INTEGER,
    storeId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  });

  Product.associate = models => {
    Product.belongsTo(models.Store, { foreignKey: "storeId", as: "store" });
    Product.belongsTo(models.User, { foreignKey: "userId", as: "seller" });

    Product.hasMany(models.CartItem, { foreignKey: "productId", as: "cartItems" });
    Product.hasMany(models.OrderItem, { foreignKey: "productId", as: "orderItems" });
    Product.hasMany(models.Review, { foreignKey: "productId", as: "reviews" });
  };

  return Product;
};
