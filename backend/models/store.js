// models/store.js
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: DataTypes.STRING,
    status: DataTypes.ENUM('approved', 'suspended'),
  });

  Store.associate = (models) => {
    Store.belongsTo(models.User, { foreignKey: 'userId' });
    Store.hasMany(models.Product, { foreignKey: 'storeId' });
    Store.hasMany(models.Order, { foreignKey: 'storeId' });
  };

  return Store;
};
