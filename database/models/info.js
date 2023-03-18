const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Info = sequelize.define('Info', {
    info: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: false },
  });

  return Info;
};