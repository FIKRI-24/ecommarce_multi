
module.exports = (sequelize, DataTypes) => {
  const Store = sequelize.define('Store', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'suspended'),
      defaultValue: 'pending'
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'stores'
  });

  Store.associate = (models) => {
    Store.belongsTo(models.User, { foreignKey: 'userId', as: 'owner' });
    Store.hasMany(models.Product, { foreignKey: 'storeId', as: 'products' });
    Store.hasMany(models.Order, { foreignKey: 'storeId', as: 'orders' });
  };

  return Store;
};
