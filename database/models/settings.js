const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DiscordSetting = sequelize.define('DiscordSetting', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'discord_settings',
    timestamps: false,
  });

  return DiscordSetting;
};