module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    tableName: "cart_items",
    timestamps: true
  });

  CartItem.associate = models => {
    CartItem.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user"
    });
    CartItem.belongsTo(models.Product, {
      foreignKey: "productId",
      as: "product"
    });
  };

  return CartItem;
};
