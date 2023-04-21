const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DiscordSetting = sequelize.define('DiscordSetting', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
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