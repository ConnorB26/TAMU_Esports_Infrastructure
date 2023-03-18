const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        isTamuEmail(value) {
          if (!/^\S+@tamu\.edu$/.test(value)) {
            throw new Error('Email must be a valid tamu.edu address');
          }
        },
      },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    discordId: { type: DataTypes.STRING, allowNull: false },
    membershipPaid: { type: DataTypes.BOOLEAN, defaultValue: false },
  });

  return User;
};