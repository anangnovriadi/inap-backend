"use strict";

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "customer",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: "customers",
      timestamps: false
    }
  );
};
