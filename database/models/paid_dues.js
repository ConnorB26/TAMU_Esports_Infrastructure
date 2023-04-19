const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PaidDue = sequelize.define('PaidDue', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    confirmation_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    claimed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
    {
      tableName: 'paid_dues',
      timestamps: false,
    }
  );

  return PaidDue;
};
