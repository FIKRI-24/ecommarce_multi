// models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    customId: {
      type: DataTypes.STRING,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('superadmin', 'penjual', 'pembeli', 'driver'),
      allowNull: false
    }
  });

  User.associate = (models) => {
    User.hasOne(models.Store, { foreignKey: 'userId' });
    User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasMany(models.CartItem, { foreignKey: 'userId' });
    User.hasMany(models.Delivery, { foreignKey: 'driverId' });
  };

  return User;
};
