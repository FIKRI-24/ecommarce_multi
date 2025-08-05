// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.ENUM('superadmin', 'penjual', 'pembeli', 'driver')
  });

  User.associate = (models) => {
    User.hasOne(models.Store, { foreignKey: 'userId' });
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasMany(models.CartItem, { foreignKey: 'userId' });
    User.hasMany(models.Delivery, { foreignKey: 'driverId' });
  };

  return User;
};
